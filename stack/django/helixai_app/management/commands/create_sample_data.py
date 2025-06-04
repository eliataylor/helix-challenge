from django.core.management.base import BaseCommand
from helixai_app.models import SideEffects, Manufacturers, Drugs, DrugEffects, Trials, DrugComparisons
from django.utils.text import slugify
import random
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Creates sample data for Manufacturers, Side Effects, Drug Effects, and Drugs'

    def handle(self, *args, **kwargs):
        # Array of manufacturer data
        manufacturers_data = [
            {"name": "Pfizer Inc.", "location": "New York, USA", "contact_info": "+1-212-555-0123"},
            {"name": "Novartis", "location": "Basel, Switzerland", "contact_info": "+41-61-555-0000"},
            {"name": "Merck & Co.", "location": "New Jersey, USA", "contact_info": "+1-908-555-0456"},
            {"name": "GlaxoSmithKline", "location": "London, UK", "contact_info": "+44-20-555-0789"},
            {"name": "Roche", "location": "Basel, Switzerland", "contact_info": "+41-61-555-1111"},
            {"name": "Johnson & Johnson", "location": "New Jersey, USA", "contact_info": "+1-732-555-2222"},
            {"name": "AstraZeneca", "location": "Cambridge, UK", "contact_info": "+44-20-555-3333"}
        ]

        # Create manufacturers
        manufacturers = []
        for mfg_data in manufacturers_data:
            manufacturer, created = Manufacturers.objects.get_or_create(**mfg_data)
            manufacturers.append(manufacturer)
            self.stdout.write(f"Created manufacturer: {manufacturer.name}")

        # Array of side effects
        side_effects_names = [
            "Headache",
            "Nausea",
            "Dizziness",
            "Fatigue",
            "Insomnia",
            "Dry mouth",
            "Anxiety",
            "Joint pain",
            "Rash"
        ]

        # Create side effects
        side_effects = []
        for effect_name in side_effects_names:
            side_effect, created = SideEffects.objects.get_or_create(name=effect_name)
            side_effects.append(side_effect)
            self.stdout.write(f"Created side effect: {effect_name}")

        # Create drug effects for each side effect with varying severities
        drug_effects = []
        for side_effect in side_effects:
            severity = DrugEffects.SeverityChoices.choices[len(drug_effects) % 4][0]  # Cycle through severities
            drug_effect, created = DrugEffects.objects.get_or_create(
                side_effect=side_effect,
                severity=severity,
                reported_count=50 + (len(drug_effects) * 25)  # Varying reported counts
            )
            drug_effects.append(drug_effect)
            self.stdout.write(f"Created drug effect for: {side_effect.name}")

        # Array of drug data
        drugs_data = [
            {
                "name": "Ibuprofen",
                "description": "Non-steroidal anti-inflammatory drug (NSAID)",
                "approval_status": Drugs.Approval_statusChoices.approved,
                "target_cost": 10,
                "full_treatment_duration": "7-10 days"
            },
            {
                "name": "Amoxicillin",
                "description": "Penicillin antibiotic",
                "approval_status": Drugs.Approval_statusChoices.approved,
                "target_cost": 15,
                "full_treatment_duration": "10-14 days"
            },
            {
                "name": "Lisinopril",
                "description": "ACE inhibitor for blood pressure",
                "approval_status": Drugs.Approval_statusChoices.approved,
                "target_cost": 20,
                "full_treatment_duration": "Ongoing"
            },
            {
                "name": "XR-789",
                "description": "Experimental cancer treatment",
                "approval_status": Drugs.Approval_statusChoices.experimental,
                "target_cost": 500,
                "full_treatment_duration": "6 months"
            },
            {
                "name": "Metformin",
                "description": "Diabetes medication",
                "approval_status": Drugs.Approval_statusChoices.approved,
                "target_cost": 25,
                "full_treatment_duration": "Ongoing"
            },
            {
                "name": "EXP-456",
                "description": "Experimental arthritis treatment",
                "approval_status": Drugs.Approval_statusChoices.experimental,
                "target_cost": 200,
                "full_treatment_duration": "3 months"
            },
            {
                "name": "Sertraline",
                "description": "SSRI antidepressant",
                "approval_status": Drugs.Approval_statusChoices.approved,
                "target_cost": 30,
                "full_treatment_duration": "6-12 months"
            }
        ]

        # Create drugs and associate them with manufacturers and drug effects
        for i, drug_data in enumerate(drugs_data):
            # Assign a manufacturer (cycling through the list)
            manufacturer = manufacturers[i % len(manufacturers)]
            
            # Create the drug
            drug, created = Drugs.objects.get_or_create(
                manufacturer=manufacturer,
                **drug_data
            )
            
            # Add 2-3 random drug effects to each drug
            num_effects = random.randint(2, 3)
            selected_effects = random.sample(drug_effects, num_effects)
            drug.drug_effects.add(*selected_effects)
            self.stdout.write(f"Created drug: {drug.name}")

        # Array of trial data
        trials_data = [
            {
                "title": "Long-term Efficacy of Ibuprofen in Chronic Pain Management",
                "sample_size": 500,
                "study_design": "Double-blind randomized controlled trial",
                "study_duration": "12 months",
                "health_status": "Chronic pain patients",
                "external_factors": "Diet and exercise monitored",
                "age_range": "18-65",
                "bias": "Selection bias possible",
                "bias_score": 2,
                "blinding": True,
                "status": Trials.StatusChoices.ongoing,
                "trial_phase": Trials.Trial_phaseChoices.phase_3,
                "pros": 85,
                "clinros": 78,
                "performance_outcomes": 82,
                "composite_score": 80,
                "complexity_score": 3,
                "success_rate": 75.5
            },
            {
                "title": "XR-789 Initial Safety Assessment",
                "sample_size": 50,
                "study_design": "Open-label pilot study",
                "study_duration": "3 months",
                "health_status": "Advanced cancer patients",
                "external_factors": "Concurrent treatments noted",
                "age_range": "35-75",
                "bias": "Small sample size",
                "bias_score": 4,
                "blinding": False,
                "status": Trials.StatusChoices.ongoing,
                "trial_phase": Trials.Trial_phaseChoices.phase_1,
                "pros": 65,
                "clinros": 70,
                "performance_outcomes": 68,
                "composite_score": 67,
                "complexity_score": 4,
                "success_rate": 60.0
            },
            {
                "title": "Comparative Study: Amoxicillin vs Standard Treatment",
                "sample_size": 1000,
                "study_design": "Multi-center randomized trial",
                "study_duration": "6 months",
                "health_status": "Bacterial infection patients",
                "external_factors": "Geographic distribution considered",
                "age_range": "12-80",
                "bias": "Minimal",
                "bias_score": 1,
                "blinding": True,
                "status": Trials.StatusChoices.completed,
                "trial_phase": Trials.Trial_phaseChoices.phase_4,
                "pros": 90,
                "clinros": 92,
                "performance_outcomes": 88,
                "composite_score": 90,
                "complexity_score": 2,
                "success_rate": 85.5
            },
            {
                "title": "EXP-456 Arthritis Treatment Evaluation",
                "sample_size": 200,
                "study_design": "Randomized controlled trial",
                "study_duration": "9 months",
                "health_status": "Moderate to severe arthritis",
                "external_factors": "Weather conditions monitored",
                "age_range": "45-75",
                "bias": "Dropout rate consideration",
                "bias_score": 3,
                "blinding": True,
                "status": Trials.StatusChoices.ongoing,
                "trial_phase": Trials.Trial_phaseChoices.phase_2,
                "pros": 75,
                "clinros": 80,
                "performance_outcomes": 72,
                "composite_score": 76,
                "complexity_score": 3,
                "success_rate": 70.0
            },
            {
                "title": "Sertraline Long-term Safety Study",
                "sample_size": 800,
                "study_design": "Longitudinal observational study",
                "study_duration": "24 months",
                "health_status": "Depression diagnosed patients",
                "external_factors": "Life events tracked",
                "age_range": "18-65",
                "bias": "Self-reporting bias possible",
                "bias_score": 3,
                "blinding": False,
                "status": Trials.StatusChoices.ongoing,
                "trial_phase": Trials.Trial_phaseChoices.phase_4,
                "pros": 82,
                "clinros": 85,
                "performance_outcomes": 80,
                "composite_score": 82,
                "complexity_score": 2,
                "success_rate": 78.5
            }
        ]

        # Create trials and associate them with drugs
        for trial_data in trials_data:
            # Find a matching drug by name in the trial title
            drug_name = next((drug.name for drug in Drugs.objects.all() 
                            if drug.name.lower() in trial_data["title"].lower()), None)
            
            if drug_name:
                drug = Drugs.objects.get(name=drug_name)
                trial, created = Trials.objects.get_or_create(
                    drug=drug,
                    **trial_data
                )
                self.stdout.write(f"Created trial: {trial.title}")

        # Array of comparison data
        comparisons_data = [
            {
                "title": "Ibuprofen vs Experimental Arthritis Treatment EXP-456",
                "comparison_criteria": {
                    "efficacy": {
                        "Ibuprofen": 75,
                        "EXP-456": 85,
                        "notes": "EXP-456 shows higher efficacy in initial trials"
                    },
                    "side_effects": {
                        "Ibuprofen": "Mild gastrointestinal issues",
                        "EXP-456": "Moderate drowsiness and dizziness",
                        "severity_comparison": "Ibuprofen has milder side effects"
                    },
                    "cost_effectiveness": {
                        "Ibuprofen": "High",
                        "EXP-456": "Low",
                        "notes": "Ibuprofen more cost-effective due to generic availability"
                    }
                },
                "expires": date.today() + timedelta(days=365),
                "ai_answer": "While EXP-456 shows promising efficacy results, Ibuprofen remains the more practical choice for most patients due to its established safety profile and cost-effectiveness. EXP-456 might be more suitable for patients with severe arthritis who haven't responded well to traditional treatments."
            },
            {
                "title": "Amoxicillin vs XR-789 Safety Profile Comparison",
                "comparison_criteria": {
                    "safety_profile": {
                        "Amoxicillin": "Well-established, mostly mild side effects",
                        "XR-789": "Limited long-term data, requires monitoring",
                        "notes": "Amoxicillin has decades of safety data"
                    },
                    "effectiveness": {
                        "Amoxicillin": "Proven for bacterial infections",
                        "XR-789": "Promising for specific cancer types",
                        "notes": "Different target conditions, not directly comparable"
                    },
                    "administration": {
                        "Amoxicillin": "Oral, simple dosing",
                        "XR-789": "Injectable, requires medical supervision",
                        "comparison": "Amoxicillin easier to administer"
                    }
                },
                "expires": date.today() + timedelta(days=180),
                "ai_answer": "These drugs serve entirely different purposes and cannot be directly compared for efficacy. Amoxicillin has a well-established safety profile for bacterial infections, while XR-789 is still in experimental phases for cancer treatment. The choice between them would depend entirely on the condition being treated."
            },
            {
                "title": "Sertraline vs Metformin Patient Outcomes",
                "comparison_criteria": {
                    "long_term_effects": {
                        "Sertraline": "Well-documented for depression management",
                        "Metformin": "Proven diabetes management outcomes",
                        "notes": "Both have strong long-term safety data"
                    },
                    "quality_of_life": {
                        "Sertraline": "Significant improvement in mental health metrics",
                        "Metformin": "Improved metabolic health indicators",
                        "notes": "Different target outcomes"
                    },
                    "adherence": {
                        "Sertraline": "Generally good with once-daily dosing",
                        "Metformin": "Some GI issues may affect adherence",
                        "comparison": "Sertraline slightly better adherence"
                    }
                },
                "expires": date.today() + timedelta(days=270),
                "ai_answer": "While both medications are effective in their respective therapeutic areas, they serve entirely different purposes. Sertraline is primarily for mental health management, while Metformin is for diabetes control. Both show good long-term outcomes when used as prescribed for their intended purposes."
            }
        ]

        # Create comparisons and associate them with drugs
        for comparison_data in comparisons_data:
            # Generate URL alias from title
            url_alias = slugify(comparison_data["title"][:50])
            
            # Create the comparison
            comparison, created = DrugComparisons.objects.get_or_create(
                title=comparison_data["title"],
                defaults={
                    "url_alias": url_alias,
                    "comparison_criteria": comparison_data["comparison_criteria"],
                    "expires": comparison_data["expires"],
                    "ai_answer": comparison_data["ai_answer"]
                }
            )

            # Find and add the drugs mentioned in the title
            all_drugs = Drugs.objects.all()
            for drug in all_drugs:
                if drug.name.lower() in comparison_data["title"].lower():
                    comparison.drugs.add(drug)