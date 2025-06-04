# admin.py
####OBJECT-ACTIONS-ADMIN_IMPORTS-STARTS####
from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Users
from .models import Drugs
from .models import SideEffects
from .models import DrugEffects
from .models import Manufacturers
from .models import Trials
from .models import DrugComparisons
####OBJECT-ACTIONS-ADMIN_IMPORTS-ENDS####

from django.contrib.admin.views.main import ChangeList
from django.utils.html import format_html
from .admin_mixins import SmartAdminMixin


image_html = '<div style="width: 50px; height: 50px; background-image: url({}); background-size: contain; background-repeat: no-repeat; background-position: center;"></div>'
no_image_html = "No Image"

# Custom pagination for large datasets
class LargeTablePaginator(admin.AdminSite):
    # Set higher page sizes with more options
    list_per_page = 50
    list_max_show_all = 1000


# Base admin class with common improvements
class BaseModelAdmin(SmartAdminMixin, admin.ModelAdmin):
    # Better pagination
    list_per_page = 50
    show_full_result_count = False  # Prevents COUNT queries on large tables

    class Media:
        css = { 'all': ('admin/css/admin_enhancements.css',) }
        js = ('admin/js/admin_enhancements.js',)


# Custom ChangeList to optimize queries
class OptimizedChangeList(ChangeList):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        # Only select the fields we need for the list display
        if self.list_display:
            required_fields = set(self.list_display)
            if 'id' not in required_fields:
                required_fields.add('id')
            qs = qs.only(*required_fields)
        return qs


####OBJECT-ACTIONS-ADMIN_MODELS-STARTS####
class UsersAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        (_('Additional Info'), {'fields': ('phone',)}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        (None, {
            'classes': ('wide',),
            'fields': ('phone',),
        }),
    )                
    def display_groups(self, obj):
        return ", ".join([group.name for group in obj.groups.all()])


    list_display = ('id', 'username', 'email', 'get_full_name', 'display_groups')        


admin.site.register(Users, UsersAdmin)

class DrugsAdmin(admin.ModelAdmin):
	readonly_fields = ('id',)

admin.site.register(Drugs, DrugsAdmin)

class SideEffectsAdmin(admin.ModelAdmin):
	readonly_fields = ('id',)

admin.site.register(SideEffects, SideEffectsAdmin)

class DrugEffectsAdmin(admin.ModelAdmin):
	readonly_fields = ('id',)

admin.site.register(DrugEffects, DrugEffectsAdmin)

class ManufacturersAdmin(admin.ModelAdmin):
	readonly_fields = ('id',)

admin.site.register(Manufacturers, ManufacturersAdmin)

class TrialsAdmin(admin.ModelAdmin):
	readonly_fields = ('id',)

admin.site.register(Trials, TrialsAdmin)

class DrugComparisonsAdmin(admin.ModelAdmin):
	readonly_fields = ('id',)

admin.site.register(DrugComparisons, DrugComparisonsAdmin)
####OBJECT-ACTIONS-ADMIN_MODELS-ENDS####