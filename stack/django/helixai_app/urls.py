####OBJECT-ACTIONS-URL-IMPORTS-STARTS####
from django.urls import re_path
from rest_framework.routers import DefaultRouter
from django.urls import include, path
from .views import UserModelListView
from .views import UserStatsView
from .views import RenderFrontendIndex
from .views import redirect_to_frontend
from .oa_testing import OATesterUserViewSet
from .views import UsersViewSet
from .views import DrugsViewSet
from .views import SideEffectsViewSet
from .views import DrugEffectsViewSet
from .views import ManufacturersViewSet
from .views import TrialsViewSet
from .views import DrugComparisonsViewSet
from .views import DrugComparisonsAliasView
from .views import SearchView
####OBJECT-ACTIONS-URL-IMPORTS-ENDS####
urlpatterns = [path('', RenderFrontendIndex.as_view(), name='index')]

####OBJECT-ACTIONS-URLS-STARTS####

OARouter = DefaultRouter(trailing_slash=False)
OARouter.register(r'oa-testers', OATesterUserViewSet, basename='oa-tester')
OARouter.register('users', UsersViewSet, basename='users')
OARouter.register('drugs', DrugsViewSet, basename='drugs')
OARouter.register('side-effects', SideEffectsViewSet, basename='side-effects')
OARouter.register('drug-effects', DrugEffectsViewSet, basename='drug-effects')
OARouter.register('manufacturers', ManufacturersViewSet, basename='manufacturers')
OARouter.register('trials', TrialsViewSet, basename='trials')
OARouter.register('drug-comparisons', DrugComparisonsViewSet, basename='drug-comparisons')

if urlpatterns is None:
    urlpatterns = []
    
urlpatterns += [
    re_path(r'^account/.*$', redirect_to_frontend, name='provider_callback_no_provider'),
    path('u/drugcomparisons/<slug:url_alias>', DrugComparisonsAliasView.as_view(), name='drugcomparisons-alias-view'),    
    path('api/users/<int:user_id>/<str:model_name>/list', UserModelListView.as_view(), name='user-model-list'),
    path('api/users/<int:user_id>/<str:model_name>/stats', UserStatsView.as_view(), name='user-model-stats'),
    path('api/', include(OARouter.urls)),
    path('api/search', SearchView.as_view(), name='search'),
]
####OBJECT-ACTIONS-URLS-ENDS####

from .views import SendCodeView, VerifyCodeView

urlpatterns += [
    path('objectactions/auth/sms', SendCodeView.as_view(), name='send_code'),
    path('objectactions/auth/verify-sms', VerifyCodeView.as_view(), name='verify_code'),
]