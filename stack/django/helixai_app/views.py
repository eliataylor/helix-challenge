####OBJECT-ACTIONS-VIEWSET-IMPORTS-STARTS####
from rest_framework import viewsets, permissions, filters, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import viewsets, permissions, filters, generics
from rest_framework.views import APIView
from django.http import JsonResponse
from django.core.management import call_command
from django.apps import apps
from django.http import HttpResponse
from django.shortcuts import redirect
from django.utils import timezone
from django.db.models import Q
from .services import send_sms
import random
import re
import os
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse, OpenApiExample, inline_serializer
from .serializers import UsersSerializer
from .models import Users
from .serializers import DrugsSerializer
from .models import Drugs
from .serializers import SideEffectsSerializer
from .models import SideEffects
from .serializers import DrugEffectsSerializer
from .models import DrugEffects
from .serializers import ManufacturersSerializer
from .models import Manufacturers
from .serializers import TrialsSerializer
from .models import Trials
from .serializers import DrugComparisonsSerializer
from .models import DrugComparisons
####OBJECT-ACTIONS-VIEWSET-IMPORTS-ENDS####
from .serializers import SearchRequestSerializer, SearchResponseSerializer

class PaginatedViewSet(viewsets.ModelViewSet):
    pagination_class = LimitOffsetPagination

    def apply_pagination(self, queryset):
        paginator = self.pagination_class()
        paginated_queryset = paginator.paginate_queryset(queryset, self.request, view=self)

        serializer_class = self.get_serializer_class_for_queryset(queryset)
        serializer = serializer_class(paginated_queryset, many=True)

        paginated_data = {
            'count': paginator.count,  # Total number of items
            'limit': paginator.limit,  # Number of items per page
            'offset': paginator.offset,  # Starting position of the current page
            #            'next': paginator.get_next_link(),  # Link to the next page, if available
            #            'previous': paginator.get_previous_link(),  # Link to the previous page, if available
            'results': serializer.data
        }

        return paginated_data

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return JsonResponse(serializer.data)

    def get_serializer_class_for_queryset(self, queryset):
        # Use model's meta information to dynamically select the serializer
        model = queryset.model

        # Map models to serializers
        model_to_serializer = {}

        # Return the corresponding serializer class
        return model_to_serializer.get(model, self.get_serializer_class())



####OBJECT-ACTIONS-VIEWSETS-STARTS####
class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all().order_by('id')
    serializer_class = UsersSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name']

    
class DrugsViewSet(viewsets.ModelViewSet):
    queryset = Drugs.objects.all().order_by('id')
    serializer_class = DrugsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    
class SideEffectsViewSet(viewsets.ModelViewSet):
    queryset = SideEffects.objects.all().order_by('id')
    serializer_class = SideEffectsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    
class DrugEffectsViewSet(viewsets.ModelViewSet):
    queryset = DrugEffects.objects.all().order_by('id')
    serializer_class = DrugEffectsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['drug__name', 'side_effect__name']

    
class ManufacturersViewSet(viewsets.ModelViewSet):
    queryset = Manufacturers.objects.all().order_by('id')
    serializer_class = ManufacturersSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    
class TrialsViewSet(viewsets.ModelViewSet):
    queryset = Trials.objects.all().order_by('id')
    serializer_class = TrialsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']

    
class DrugComparisonsViewSet(viewsets.ModelViewSet):
    queryset = DrugComparisons.objects.all().order_by('id')
    serializer_class = DrugComparisonsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['drug__name']

    
class DrugComparisonsAliasView(generics.RetrieveAPIView):
        queryset = DrugComparisons.objects.all()
        serializer_class = DrugComparisonsSerializer
        lookup_field = 'url_alias'
####OBJECT-ACTIONS-VIEWSETS-ENDS####


####OBJECT-ACTIONS-CORE-STARTS####
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

SEARCH_FIELDS_MAPPING = {
  "Users": [
    "first_name",
    "last_name"
  ],
  "Drugs": [
    "name"
  ],
  "SideEffects": [
    "name"
  ],
  "DrugEffects": [
    "drug__name",
    "side_effect__name"
  ],
  "Manufacturers": [
    "name"
  ],
  "Trials": [
    "title"
  ],
  "DrugComparisons": [
    "drug__name"
  ]
}

SERIALZE_MODEL_MAP = { "Users": UsersSerializer,"Drugs": DrugsSerializer,"SideEffects": SideEffectsSerializer,"DrugEffects": DrugEffectsSerializer,"Manufacturers": ManufacturersSerializer,"Trials": TrialsSerializer,"DrugComparisons": DrugComparisonsSerializer }

class UserStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, model_name):
        # Get the model class from the model name
        try:
            model = apps.get_model('helixai_app', model_name)
        except LookupError:
            return JsonResponse({'error': 'Model not found'}, status=404)

        # Check if the model has an 'author' field
        if not hasattr(model, 'author'):
            return JsonResponse({'error': 'Model does not have an author field'}, status=400)

        # Count the number of entities the user owns
        count = model.objects.filter(author=user_id).count()

        # Return the count as JSON
        return JsonResponse({'model': model_name, 'count': count})

@extend_schema(
    parameters=[
        OpenApiParameter(name='search', description='Search term', required=False, type=str),
    ],
    responses={200: 'Paginated list of objects owned by the user'},
)
class UserModelListView(generics.GenericAPIView):

    permission_classes = [permissions.IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter]
    def get(self, request, user_id, model_name):
        # Check if the model exists
        try:
            model_class = apps.get_model("helixai_app", model_name)
        except LookupError:
            return JsonResponse({'detail': 'Model not found.'}, status=404)

        # Filter the queryset based on author
        queryset = model_class.objects.filter(author_id=user_id)

        # Apply search filtering
        self.search_fields = SEARCH_FIELDS_MAPPING.get(model_name, [])
        search_query = request.query_params.get('search')
        if search_query:
            queryset = self.filter_queryset(queryset)

        serializer_class = self.get_serializer_classname(model_class)

        if not serializer_class:
            return JsonResponse({'detail': 'Serializer not found for this model.'}, status=404)

        # Apply pagination
        paginator = self.pagination_class()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = serializer_class(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)

    def get_serializer_classname(self, model_class):
        # Dynamically determine the serializer class based on the model
        return SERIALZE_MODEL_MAP.get(model_class.__name__)

    def filter_queryset(self, queryset):
        search_filter = filters.SearchFilter()
        return search_filter.filter_queryset(self.request, queryset, self)



class RenderFrontendIndex(APIView):
    def get(self, request, *args, **kwargs):
        file_path = os.getenv("FRONTEND_INDEX_HTML", "index.html")
        if not os.path.isfile(file_path):
            return HttpResponse('Ok', content_type='text/html')

        with open(file_path, 'r') as file:
            html_content = file.read()

        modified_html = html_content
        frontend_url = os.getenv('FRONTEND_URL', 'https://localhost.helix.ai:3003')

        # Prepend the host to all relative URLs
        def prepend_host(match):
            url = match.group(1)
            if url.startswith('/') or not url.startswith(('http://', 'https://')):
                return f'{match.group(0)[:5]}{frontend_url}/{url.lstrip("/")}"'
            return match.group(0)

        # Prepend the host to all relative src and href URLs
        modified_html = re.sub(r'src="([^"]+)"', prepend_host, modified_html)
        modified_html = re.sub(r'href="([^"]+)"', prepend_host, modified_html)

        # react-scripts bundle instead of compiled version
        if ":3003" in frontend_url:
            modified_html = modified_html.replace('</head>',
                                                  f'<script defer="" src="{frontend_url}/static/js/bundle.js"></script></head>')

        return HttpResponse(modified_html, content_type='text/html')

def redirect_to_frontend(request, provider=None):
    frontend_url = os.getenv('REACT_APP_APP_HOST', 'https://localhost.helix.ai:3003')
    redirect_path = request.path
    query_params = request.GET.copy()
    if "provider" in query_params:
        redirect_path = redirect_path.replace("provider", query_params['provider'])
    query_string = query_params.urlencode()
    response = redirect(f'{frontend_url}{redirect_path}?{query_string}')
    return response

####OBJECT-ACTIONS-CORE-ENDS####

from django.contrib.auth import get_user_model
from django.conf import settings
from allauth.account.models import EmailAddress
from allauth.account.utils import complete_signup, perform_login
from allauth.socialaccount.sessions import LoginSession
from rest_framework import status
from .serializers import VerifyPhoneSerializer, PhoneNumberSerializer

import os


class SendCodeView(APIView):
    permission_classes = [permissions.AllowAny]  # Allow any user to access this view

    @extend_schema(
        request=PhoneNumberSerializer,
        responses={
            200: OpenApiResponse(description='SMS sent successfully', examples={
                'application/json': {"detail": "SMS sent successfully"}
            }),
            400: OpenApiResponse(description='Bad request', examples={
                'application/json': {"phone_number": ["This field is required."]}
            }),
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = PhoneNumberSerializer(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data['phone']
            code = str(random.randint(1000, 999999))
            if phone_number == '+14159999999':
                return JsonResponse({"detail": "Enter your Demo Account code"}, status=status.HTTP_200_OK)
            message = f"Your localhost.helix.ai verification code is {code}"
            send_sms(phone_number, message)
            request.session['code'] = code
            return JsonResponse({"detail": "SMS sent successfully"}, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyCodeView(APIView):
    permission_classes = [permissions.AllowAny]  # Allow any user to access this view

    @extend_schema(
        request=VerifyPhoneSerializer,
        responses={
            200: OpenApiResponse(description='SMS sent successfully', examples={
                'application/json': {"detail": "SMS sent successfully", "id": "user id"}
            }),
            400: OpenApiResponse(description='Bad request', examples={
                'application/json': {"phone_number": ["This field is required."]}
            }),
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = VerifyPhoneSerializer(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data['phone']
            code = str(serializer.validated_data['code'])
            if str(request.session.get('code')) == code or (phone_number == '+14159999999' and code == '542931'):

                redirect_url = f"/"

                try:
                    user = get_user_model().objects.get(phone=phone_number)
                    created = False
                except get_user_model().DoesNotExist:
                    user = get_user_model().objects.create(username=phone_number,
                                                           email=f'{phone_number}@sms-placeholder.com',
                                                           phone=phone_number)
                    created = True
                    redirect_url = f"/users/{user.id}"

                if created:
                    user.phone = phone_number  # Save the phone field
                    user.set_unusable_password()  # Set password logic as needed
                    user.save()
                    email_address = EmailAddress.objects.create(user=user, email=user.email, verified=True,
                                                                primary=True)
                    response = complete_signup(request, user, False, redirect_url)
                else:
                    response = perform_login(
                        request,
                        user,
                        False,
                        redirect_url)

                LoginSession(request, "sms_login_session", settings.SESSION_COOKIE_NAME)
                response = JsonResponse({"detail": "Verification successful",
                                         "id": user.id,
                                         "redirect": redirect_url},
                                        status=status.HTTP_200_OK)
                response.url = redirect_url
                response.apiVersion = timezone.now()
                return response

            return JsonResponse({"error": "Invalid code"}, status=status.HTTP_400_BAD_REQUEST)

        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    tags=['Search'],
    description="""
    Search endpoint that searches across multiple content types.
    Returns grouped results by type with counts and metadata.
    """,
    parameters=[
        OpenApiParameter(
            name='query',
            description='Search term to look for across selected types',
            required=True,
            type=str,
            location=OpenApiParameter.QUERY
        ),
        OpenApiParameter(
            name='types',
            description='Comma-separated list of types to search in (e.g. Drugs,Manufacturers)',
            required=True,
            type=str,
            location=OpenApiParameter.QUERY
        )
    ],
    responses={
        200: SearchResponseSerializer,
        400: inline_serializer(
            name='SearchError',
            fields={
                'error': 'string'
            }
        )
    },
    examples=[
        OpenApiExample(
            'Example Request',
            description='Search for aspirin across drugs and manufacturers',
            value={
                'query': 'aspirin',
                'types': 'Drugs,Manufacturers'
            },
            request_only=True
        ),
        OpenApiExample(
            'Success Response',
            value={
                'results': {
                    'Drugs': {
                        'items': [
                            {
                                'id': 1,
                                'name': 'Aspirin',
                                'description': 'Pain reliever'
                            }
                        ],
                        'count': 1
                    }
                },
                'query': 'aspirin',
                'selected_types': ['Drugs', 'Manufacturers']
            },
            response_only=True
        )
    ]
)    
class SearchView(APIView):
    """
    Search endpoint that searches across multiple model types based on provided search term
    and selected types using GET parameters.
    """
    def get(self, request):
        # Get and validate query parameters
        search_term = request.GET.get('query', '').lower()
        types_param = request.GET.get('types', '')
        
        if not search_term:
            return JsonResponse(
                {'error': 'Query parameter is required'}, 
                status=400
            )
            
        if not types_param:
            return JsonResponse(
                {'error': 'Types parameter is required'}, 
                status=400
            )
            
        selected_types = [t.strip() for t in types_param.split(',')]
        results = {}

        # Drugs search
        if 'Drugs' in selected_types: 
            drugs = Drugs.objects.filter(
                Q(name__icontains=search_term) |
                Q(description__icontains=search_term)
            ).select_related('manufacturer').order_by('-modified_at')[:50]
            results['Drugs'] = {
                'items': DrugsSerializer(drugs, many=True).data,
                'count': len(drugs)
            }

        # Manufacturers search
        if 'Manufacturers' in selected_types:
            manufacturers = Manufacturers.objects.filter(
                Q(name__icontains=search_term) |
                Q(location__icontains=search_term)
            ).order_by('-modified_at')[:50]
            results['Manufacturers'] = {
                'items': ManufacturersSerializer(manufacturers, many=True).data,
                'count': len(manufacturers)
            }

        # Trials search
        if 'Trial' in selected_types:
            trials = Trials.objects.filter(
                Q(title__icontains=search_term) |
                Q(study_design__icontains=search_term) |
                Q(health_status__icontains=search_term)
            ).select_related('drug').order_by('-modified_at')[:50]
            results['trials'] = {
                'items': TrialsSerializer(trials, many=True).data,
                'count': len(trials)
            }

        # Side Effects search
        if 'SideEffects' in selected_types:
            side_effects = SideEffects.objects.filter(
                name__icontains=search_term
            ).order_by('-modified_at')[:50]
            results['SideEffects'] = {
                'items': SideEffectsSerializer(side_effects, many=True).data,
                'count': len(side_effects)
            }

        # Drug Effects search
        if 'DrugEffects' in selected_types:
            drug_effects = DrugEffects.objects.filter(
                Q(drug__name__icontains=search_term) |
                Q(side_effect__name__icontains=search_term)
            ).select_related('drug', 'side_effect').order_by('-modified_at')[:50]
            results['DrugEffects'] = {
                'items': DrugEffectsSerializer(drug_effects, many=True).data,
                'count': len(drug_effects)
            }

        # Drug Comparisons search
        if 'DrugComparisons' in selected_types:
            comparisons = DrugComparisons.objects.filter(
                Q(title__icontains=search_term) |
                Q(ai_answer__icontains=search_term)
            ).prefetch_related('drugs').order_by('-modified_at')[:50]
            results['DrugComparisons'] = {
                'items': DrugComparisonsSerializer(comparisons, many=True).data,
                'count': len(comparisons)
            }

        return JsonResponse({
            'results': results,
            'query': search_term,
            'selected_types': selected_types
        })