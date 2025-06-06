# Generated by Django 5.0.7 on 2025-06-01 06:28

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('helixai_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='drugcomparisons',
            name='drugs',
        ),
        migrations.RemoveField(
            model_name='drugs',
            name='treatment_duration',
        ),
        migrations.RemoveField(
            model_name='sideeffects',
            name='drug',
        ),
        migrations.RemoveField(
            model_name='sideeffects',
            name='reported_count',
        ),
        migrations.RemoveField(
            model_name='sideeffects',
            name='severity',
        ),
        migrations.AddField(
            model_name='drugcomparisons',
            name='ai_answer',
            field=models.TextField(blank=True, null=True, verbose_name='AI Answer'),
        ),
        migrations.AddField(
            model_name='drugcomparisons',
            name='drug',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='helixai_app.drugs', verbose_name='Drug'),
        ),
        migrations.AddField(
            model_name='drugcomparisons',
            name='expires',
            field=models.DateField(blank=True, null=True, verbose_name='Expires'),
        ),
        migrations.AddField(
            model_name='drugcomparisons',
            name='title',
            field=models.CharField(default=django.utils.timezone.now, max_length=255, verbose_name='Title'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='drugcomparisons',
            name='url_alias',
            field=models.SlugField(blank=True, null=True, unique=True, verbose_name='URL Alias'),
        ),
        migrations.AddField(
            model_name='drugs',
            name='full_treatment_duration',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Full Treatment Duration'),
        ),
        migrations.AlterField(
            model_name='drugcomparisons',
            name='comparison_criteria',
            field=models.JSONField(verbose_name='Comparison Criteria'),
        ),
        migrations.AlterField(
            model_name='drugs',
            name='approval_status',
            field=models.CharField(choices=[('approved', 'Approved'), ('experimental', ' experimental')], default='experimental', max_length=12, verbose_name='Approval Status'),
        ),
        migrations.AlterField(
            model_name='drugs',
            name='description',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Description'),
        ),
        migrations.AlterField(
            model_name='drugs',
            name='manufacturer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='helixai_app.manufacturers', verbose_name='Manufacturer'),
        ),
        migrations.AlterField(
            model_name='drugs',
            name='target_cost',
            field=models.IntegerField(blank=True, null=True, verbose_name='Target Cost'),
        ),
        migrations.CreateModel(
            name='DrugEffects',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('severity', models.CharField(choices=[('mild', 'Mild'), ('medium', 'Medium'), ('severe', 'Severe'), ('fatal', 'Fatal')], max_length=6, verbose_name='Severity')),
                ('reported_count', models.IntegerField(default=1, verbose_name='Reported Count')),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('drug', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='helixai_app.drugs', verbose_name='Drug')),
                ('side_effect', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='helixai_app.sideeffects', verbose_name='Side Effect')),
            ],
            options={
                'verbose_name': 'Drug Effect',
                'verbose_name_plural': 'Drug Effects',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Trials',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=255, verbose_name='Title')),
                ('sample_size', models.IntegerField(verbose_name='Sample Size')),
                ('study_design', models.TextField(verbose_name='Study Design')),
                ('study_duration', models.CharField(max_length=255, verbose_name='Study Duration')),
                ('health_status', models.CharField(max_length=255, verbose_name='Health Status')),
                ('external_factors', models.CharField(max_length=255, verbose_name='External Factors')),
                ('age_range', models.CharField(max_length=255, verbose_name='Age Range')),
                ('bias', models.CharField(blank=True, max_length=255, null=True, verbose_name='Bias')),
                ('bias_score', models.IntegerField(blank=True, null=True, verbose_name='Bias Score')),
                ('blinding', models.BooleanField(verbose_name='Blinding')),
                ('status', models.CharField(choices=[('ongoing', 'Ongoing'), ('completed', ' completed'), ('suspended', ' suspended'), ('terminated', ' terminated')], default='ongoing', max_length=10, verbose_name='Status')),
                ('trial_phase', models.CharField(choices=[('phase_1', 'Phase 1'), ('phase_2', ' Phase 2'), ('phase_3', ' Phase 3'), ('phase_4', ' Phase 4')], max_length=7, verbose_name='Trial Phase')),
                ('pros', models.IntegerField(blank=True, null=True, verbose_name='Patient Reported Outcomes')),
                ('clinros', models.IntegerField(blank=True, null=True, verbose_name='Clinical Reported Outcomes')),
                ('performance_outcomes', models.IntegerField(blank=True, null=True, verbose_name='Performance Outcomes')),
                ('composite_score', models.IntegerField(blank=True, null=True, verbose_name='Composite Score')),
                ('complexity_score', models.IntegerField(blank=True, null=True, verbose_name='Complexity Score')),
                ('success_rate', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Success Rate')),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('drug', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='helixai_app.drugs', verbose_name='Drug')),
                ('side_effects', models.ManyToManyField(blank=True, related_name='side_effects_to_type_reference', to='helixai_app.drugs', verbose_name='Side Effects')),
            ],
            options={
                'verbose_name': 'Trial',
                'verbose_name_plural': 'Trials',
                'abstract': False,
            },
        ),
        migrations.DeleteModel(
            name='ClinicalTrials',
        ),
    ]
