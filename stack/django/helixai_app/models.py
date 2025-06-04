####OBJECT-ACTIONS-MODELS_IMPORTS-STARTS####
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from utils.models import BumpParentsModelMixin
from allauth.account.models import EmailAddress
from django.dispatch import receiver
from allauth.account.signals import email_confirmed
from django.utils.timezone import now
from django.core.exceptions import ValidationError
import re
####OBJECT-ACTIONS-MODELS_IMPORTS-ENDS####

####OBJECT-ACTIONS-MODELS-STARTS####
def validate_phone_number(value):
	phone_regex = re.compile(r'^\+?1?\d{9,15}$')
	if not phone_regex.match(value):
		raise ValidationError("Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")

class Users(AbstractUser, BumpParentsModelMixin):
	class Meta:
		verbose_name = "User"
		verbose_name_plural = "Users"
		ordering = ['last_login']



	phone = models.CharField(validators=[validate_phone_number], max_length=16, verbose_name='Phone')

	def __str__(self):
		if self.get_full_name().strip():
			return self.get_full_name()
		elif self.get_short_name().strip():
			return self.get_short_name()
		elif self.username.strip():
			return self.username
		else:
			return str(self.id) # never expose the email

	def save(self, *args, **kwargs):
		super().save(*args, **kwargs)

	def add_email_address(self, request, new_email):
		# Add a new email address for the user, and send email confirmation.
		# Old email will remain the primary until the new one is confirmed.
		return EmailAddress.objects.add_email(request, request.user, new_email, confirm=True)


	@receiver(email_confirmed)
	def update_user_email(sender, request, email_address, **kwargs):
		# Once the email address is confirmed, make new email_address primary.
		# This also sets user.email to the new email address.
		# email_address is an instance of allauth.account.models.EmailAddress
		email_address.set_as_primary()
		# Get rid of old email addresses
		EmailAddress.objects.filter(user=email_address.user).exclude(primary=True).delete()

class SuperModel(models.Model):
	created_at = models.DateTimeField(auto_now_add=True)
	modified_at = models.DateTimeField(auto_now=True)
	author = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
	class Meta:
		abstract = True
		ordering = ['modified_at']

	def save(self, *args, **kwargs):
		self.modified_at = now()
		super().save(*args, **kwargs)

	def __str__(self):
		if hasattr(self, "title"):
			return self.title
		elif hasattr(self, "name"):
			return self.name
		elif hasattr(self, "slug"):
			return self.slug

		return super().__str__()

	@classmethod
	def get_current_user(cls, request):
		if hasattr(request, 'user') and request.user.is_authenticated:
			return request.user
		return None


class Drugs(SuperModel):
	class Meta:
		abstract = False
		verbose_name = "Drug"
		verbose_name_plural = "Drugs"
	
	class Approval_statusChoices(models.TextChoices):
		approved = ("approved", "Approved")
		experimental = ("experimental", " experimental")
	name = models.CharField(max_length=255, verbose_name='Name')
	description = models.CharField(max_length=255, blank=True, null=True, verbose_name='Description')
	approval_status = models.CharField(max_length=12, choices=Approval_statusChoices.choices, verbose_name='Approval Status', default="experimental")
	manufacturer = models.ForeignKey('Manufacturers', on_delete=models.SET_NULL, related_name='+', null=True, verbose_name='Manufacturer')
	drug_effects = models.ManyToManyField('DrugEffects', related_name='drug_to_effects', null=True, verbose_name='Drug Effects')
	target_cost = models.IntegerField(blank=True, null=True, verbose_name='Target Cost')
	full_treatment_duration = models.CharField(max_length=255, blank=True, null=True, verbose_name='Full Treatment Duration')

class SideEffects(SuperModel):
	class Meta:
		abstract = False
		verbose_name = "Side Effect"
		verbose_name_plural = "Side Effects"

	name = models.CharField(max_length=255, verbose_name='Name')

class DrugEffects(SuperModel):
	class Meta:
		abstract = False
		verbose_name = "Drug Effect"
		verbose_name_plural = "Drug Effects"

	def __str__(self):
		return f"{self.severity} {self.side_effect.name} ({self.reported_count} cases)"

	class SeverityChoices(models.TextChoices):
		mild = ("mild", "Mild")
		medium = ("medium", "Medium")
		severe = ("severe", "Severe")
		fatal = ("fatal", "Fatal")
	
	side_effect = models.ForeignKey('SideEffects', on_delete=models.SET_NULL, related_name='+', null=True, verbose_name='Side Effect')
	severity = models.CharField(max_length=6, choices=SeverityChoices.choices, verbose_name='Severity')
	reported_count = models.IntegerField(default=1, verbose_name='Reported Count')

class Manufacturers(SuperModel):
	class Meta:
		abstract = False
		verbose_name = "Manufacturer"
		verbose_name_plural = "Manufacturers"

	name = models.CharField(max_length=255, verbose_name='Name')
	location = models.CharField(max_length=255, blank=True, null=True, verbose_name='Location')
	contact_info = models.CharField(max_length=255, blank=True, null=True, verbose_name='Contact Info')

class Trials(SuperModel):
	class Meta:
		abstract = False
		verbose_name = "Trial"
		verbose_name_plural = "Trials"
	
	class StatusChoices(models.TextChoices):
		ongoing = ("ongoing", "Ongoing")
		completed = ("completed", " completed")
		suspended = ("suspended", " suspended")
		terminated = ("terminated", " terminated")
	
	class Trial_phaseChoices(models.TextChoices):
		phase_1 = ("phase_1", "Phase 1")
		phase_2 = ("phase_2", " Phase 2")
		phase_3 = ("phase_3", " Phase 3")
		phase_4 = ("phase_4", " Phase 4")
	title = models.CharField(max_length=255, verbose_name='Title')
	drug = models.ForeignKey('Drugs', on_delete=models.SET_NULL, related_name='+', null=True, verbose_name='Drug')
	sample_size = models.IntegerField(verbose_name='Sample Size')
	study_design = models.TextField(verbose_name='Study Design')
	study_duration = models.CharField(max_length=255, verbose_name='Study Duration')
	health_status = models.CharField(max_length=255, verbose_name='Health Status')
	external_factors = models.CharField(max_length=255, verbose_name='External Factors')
	age_range = models.CharField(max_length=255, verbose_name='Age Range')
	bias = models.CharField(max_length=255, blank=True, null=True, verbose_name='Bias')
	bias_score = models.IntegerField(blank=True, null=True, verbose_name='Bias Score')
	blinding = models.BooleanField(verbose_name='Blinding')
	status = models.CharField(max_length=10, choices=StatusChoices.choices, verbose_name='Status', default="ongoing")
	trial_phase = models.CharField(max_length=7, choices=Trial_phaseChoices.choices, verbose_name='Trial Phase')
	pros = models.IntegerField(blank=True, null=True, verbose_name='Patient Reported Outcomes')
	clinros = models.IntegerField(blank=True, null=True, verbose_name='Clinical Reported Outcomes')
	performance_outcomes = models.IntegerField(blank=True, null=True, verbose_name='Performance Outcomes')
	composite_score = models.IntegerField(blank=True, null=True, verbose_name='Composite Score')
	complexity_score = models.IntegerField(blank=True, null=True, verbose_name='Complexity Score')
	success_rate = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, verbose_name='Success Rate')
	drug_effects = models.ManyToManyField('Drugs', related_name='drug_effects_to_trials', blank=True, verbose_name='Drug Effects')

class DrugComparisons(SuperModel):
	class Meta:
		abstract = False
		verbose_name = "Drug Comparison"
		verbose_name_plural = "Drug Comparisons"

	title = models.CharField(max_length=255, verbose_name='Title')
	url_alias = models.SlugField(unique=True, blank=True, null=True, verbose_name='URL Alias')
	drugs = models.ManyToManyField('Drugs', related_name='+', null=True, verbose_name='Drugs')
	comparison_criteria = models.JSONField(verbose_name='Comparison Criteria')
	expires = models.DateField(blank=True, null=True, verbose_name='Expires')
	ai_answer = models.TextField(blank=True, null=True, verbose_name='AI Answer')
####OBJECT-ACTIONS-MODELS-ENDS####