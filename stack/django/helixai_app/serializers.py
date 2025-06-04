####OBJECT-ACTIONS-SERIALIZER-IMPORTS-STARTS####
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import ManyToManyField
from .models import Users
from .models import Drugs
from .models import SideEffects
from .models import DrugEffects
from .models import Manufacturers
from .models import Trials
from .models import DrugComparisons
####OBJECT-ACTIONS-SERIALIZER-IMPORTS-ENDS####
import logging
logger = logging.getLogger(__name__)
from django.core.exceptions import FieldDoesNotExist
from google.auth.exceptions import DefaultCredentialsError

####OBJECT-ACTIONS-SERIALIZERS-STARTS####
class CustomUsersSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        # Get the original representation
        representation = super().to_representation(instance)
        # Add the model type
        representation['_type'] = instance.__class__.__name__

        for field in self.Meta.model._meta.get_fields():
            if field.is_relation and hasattr(instance, field.name):
                field_name = field.name
                related_instance = getattr(instance, field_name)

                if field.many_to_one:
                    if related_instance is not None:
                        representation[field_name] = {
                            "id": related_instance.pk,
                            "str": str(related_instance),
                            "_type": related_instance.__class__.__name__,
                        }

                elif field.many_to_many:
                    related_instances = related_instance.all()
                    representation[field_name] = [
                        {
                            "id": related.pk,
                            "str": str(related),
                            "_type": related.__class__.__name__,
                        } for related in related_instances
                    ]
        return representation

class CustomSerializer(serializers.ModelSerializer):
    # serializer_related_field = SubFieldRelatedField
    def create(self, validated_data):
        request = self.context.get('request', None)
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            field_names = [field.name for field in self.Meta.model._meta.get_fields()]
            if 'author' in field_names:
                validated_data['author'] = request.user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        request = self.context.get('request', None)
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            field_names = [field.name for field in self.Meta.model._meta.get_fields()]
            if 'author' in field_names:
                validated_data['author'] = request.user
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        # Get the original representation
        representation = super().to_representation(instance)
        # Add the model type
        representation['_type'] = instance.__class__.__name__

        for field in self.Meta.model._meta.get_fields():
            if field.is_relation and hasattr(instance, field.name):
                field_name = field.name
                related_instance = getattr(instance, field_name)

                if field.many_to_one:
                    if related_instance is not None:
                        representation[field_name] = {
                            "id": related_instance.pk,
                            "str": str(related_instance),
                            "_type": related_instance.__class__.__name__,
                        }

                elif field.many_to_many:
                    related_instances = related_instance.all()
                    representation[field_name] = [
                        {
                            "id": related.pk,
                            "str": str(related),
                            "_type": related.__class__.__name__,
                        } for related in related_instances
                    ]
        return representation
class UsersSerializer(CustomUsersSerializer):
    class Meta:
        model = Users
        exclude = ('password', 'email', 'is_active', 'is_staff', 'is_superuser')
class DrugsSerializer(CustomSerializer):
    class Meta:
        model = Drugs
        fields = '__all__'
class SideEffectsSerializer(CustomSerializer):
    class Meta:
        model = SideEffects
        fields = '__all__'
class DrugEffectsSerializer(CustomSerializer):
    class Meta:
        model = DrugEffects
        fields = '__all__'
class ManufacturersSerializer(CustomSerializer):
    class Meta:
        model = Manufacturers
        fields = '__all__'
class TrialsSerializer(CustomSerializer):
    class Meta:
        model = Trials
        fields = '__all__'
class DrugComparisonsSerializer(CustomSerializer):
    class Meta:
        model = DrugComparisons
        fields = '__all__'
####OBJECT-ACTIONS-SERIALIZERS-ENDS####


# serializers.py

class PhoneNumberSerializer(serializers.Serializer):
    phone = serializers.CharField()

class VerifyPhoneSerializer(serializers.Serializer):
    phone = serializers.CharField()
    code = serializers.CharField()


class SearchRequestSerializer(serializers.Serializer):
    query = serializers.CharField(help_text="Search term to query across selected types")
    types = serializers.ListField(
        child=serializers.ChoiceField(choices=[
            'Drugs', 'Manufacturers', 'Trials', 'SideEffects', 
            'DrugEffects', 'DrugComparisons'
        ]),
        help_text="List of content types to search"
    )

class SearchResultSerializer(serializers.Serializer):
    items = serializers.ListField(child=serializers.DictField())
    count = serializers.IntegerField()

class SearchResponseSerializer(serializers.Serializer):
    results = serializers.DictField(
        child=SearchResultSerializer(),
        help_text="Search results grouped by type"
    )
    query = serializers.CharField(help_text="Search term used")
    selected_types = serializers.ListField(
        child=serializers.CharField(),
        help_text="Types that were searched"
    )
