//---OBJECT-ACTIONS-API-RESP-STARTS---//
export type ModelName = "Users" | "Drugs" | "SideEffects" | "DrugEffects" | "Manufacturers" | "Trials" | "DrugComparisons";

export type ModelType<T extends ModelName> = T extends 'Users' ? Users : 
T extends 'Drugs' ? Drugs :
T extends 'SideEffects' ? SideEffects :
T extends 'DrugEffects' ? DrugEffects :
T extends 'Manufacturers' ? Manufacturers :
T extends 'Trials' ? Trials :
T extends 'DrugComparisons' ? DrugComparisons : never

export interface RelEntity<T extends ModelName = ModelName> {
  id: string | number;
  str: string;
  _type: T;
  img?: string;
  entity?: Partial<ModelType<T>>;
}

export type ITypeFieldSchema = {
  [K in ModelName]: {
    [fieldName: string]: FieldTypeDefinition;
  };
}

export interface ApiListResponse<T extends ModelName> {
    count: number;
    offset: number;
    limit: number;
    meta: any;
    error: string | null;
    results: Array<ModelType<T>>
}

// Define the response type using ApiListResponse
export interface SearchResponse {
  results: {
    [K in ModelName]?: {
      items: Array<any>;  // Using any here since we don't know the exact type
      count: number;
    }
  };
  query: string;
  selected_types: ModelName[];
}


export type SearchResult<T = ModelType<ModelName>> = {
  items: T[];
  count: number;
}

export type SearchResults = {
  [K in ModelName]?: SearchResult;
}


export function getNavItem(modelName: ModelName): NavItem | undefined {
  return NAVITEMS.find(item => item.type === modelName)
}

export function getProp<T extends ModelName, K extends keyof ModelType<T>>(
  entity: ModelType<T>,
  key: K
): ModelType<T>[K] | null {
  if (key in entity) return entity[key];
  return null;
}


//---OBJECT-ACTIONS-API-RESP-ENDS---//


//---OBJECT-ACTIONS-TYPE-CONSTANTS-STARTS---//
export interface FieldTypeDefinition {
    machine: string;
    singular: string;
    plural: string;
    data_type: 'string' | 'number' | 'boolean' | 'object' | 'RelEntity';
    field_type: string;
    cardinality: number | typeof Infinity;
    relationship?: ModelName;
    required: boolean;
    default: string;
    example: string;
    options?: Array<{ label: string; id: string; }>;
}

export const TypeFieldSchema: ITypeFieldSchema = {
  "Users": {
    "phone": {
      "machine": "phone",
      "singular": "Phone",
      "plural": "Phones",
      "field_type": "phone",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    }
  },
  "Drugs": {
    "name": {
      "machine": "name",
      "singular": "Name",
      "plural": "Names",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },
    "author": {
      "machine": "author",
      "singular": "author",
      "plural": "authors",
      "relationship": "Users",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },    
    "description": {
      "machine": "description",
      "singular": "Description",
      "plural": "Descriptions",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    },
    "approval_status": {
      "machine": "approval_status",
      "singular": "Approval Status",
      "plural": "Approval Statuses",
      "field_type": "enum",
      "data_type": "string",
      "cardinality": 1,
      "default": "experimental",
      "required": true,
      "example": "approved, experimental",
      "options": [
        {
          "label": "Approved",
          "id": "approved"
        },
        {
          "label": "Experimental",
          "id": "experimental"
        }
      ]
    },
    "manufacturer": {
      "machine": "manufacturer",
      "singular": "Manufacturer",
      "plural": "Manufacturers",
      "relationship": "Manufacturers",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },
    "target_cost": {
      "machine": "target_cost",
      "singular": "Target Cost",
      "plural": "Target Costs",
      "field_type": "integer",
      "data_type": "number",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    },
    "full_treatment_duration": {
      "machine": "full_treatment_duration",
      "singular": "Full Treatment Duration",
      "plural": "Full Treatment Durations",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    },
    "drug_effects_to_trials" : {
      "machine": "drug_effects_to_trials",
      "singular": "Trials",
      "plural": "Trials",
      "relationship": "Trials",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": Infinity,
      "default": "",
      "required": false,
      "example": ""
    },
    "drug_effects": {
      "machine": "drug_effects",
      "singular": "Drug Effects",
      "plural": "Drug Effects",
      "relationship": "DrugEffects",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": Infinity,
      "default": "",
      "required": false,
      "example": ""
    }
  },
  "SideEffects": {
    "name": {
      "machine": "name",
      "singular": "Name",
      "plural": "Names",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    }
  },
  "DrugEffects": {
    "drug": {
      "machine": "drug",
      "singular": "Drug",
      "plural": "Drugs",
      "relationship": "Drugs",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },
    "side_effect": {
      "machine": "side_effect",
      "singular": "Side Effect",
      "plural": "Side Effects",
      "relationship": "SideEffects",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },
    "severity": {
      "machine": "severity",
      "singular": "Severity",
      "plural": "Severitys",
      "field_type": "enum",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": "mild, medium, severe, fatal",
      "options": [
        {
          "label": "mild",
          "id": "mild"
        },
        {
          "label": "medium",
          "id": "medium"
        },
        {
          "label": "severe",
          "id": "severe"
        },
        {
          "label": "fatal",
          "id": "fatal"
        }
      ]
    },
    "reported_count": {
      "machine": "reported_count",
      "singular": "Reported Count",
      "plural": "Reported Counts",
      "field_type": "integer",
      "data_type": "number",
      "cardinality": 1,
      "default": "1",
      "required": true,
      "example": ""
    }
  },
  "Manufacturers": {
    "name": {
      "machine": "name",
      "singular": "Name",
      "plural": "Names",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },
    "location": {
      "machine": "location",
      "singular": "Location",
      "plural": "Locations",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    },
    "contact_info": {
      "machine": "contact_info",
      "singular": "Contact Info",
      "plural": "Contact Infos",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    }
  },
  "Trials": {
    "title": {
      "machine": "title",
      "singular": "Title",
      "plural": "Titles",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },
    "drug": {
      "machine": "drug",
      "singular": "Drug",
      "plural": "Drugs",
      "relationship": "Drugs",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },
    "sample_size": {
      "machine": "sample_size",
      "singular": "Sample Size",
      "plural": "Sample Sizes",
      "field_type": "integer",
      "data_type": "number",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },
    "study_design": {
      "machine": "study_design",
      "singular": "Study Design",
      "plural": "Study Designs",
      "field_type": "textarea",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },
    "study_duration": {
      "machine": "study_duration",
      "singular": "Study Duration",
      "plural": "Study Durations",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },
    "health_status": {
      "machine": "health_status",
      "singular": "Health Status",
      "plural": "Health Statuses",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },
    "external_factors": {
      "machine": "external_factors",
      "singular": "External Factor",
      "plural": "External Factorss",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },
    "age_range": {
      "machine": "age_range",
      "singular": "Age Range",
      "plural": "Age Ranges",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },
    "bias": {
      "machine": "bias",
      "singular": "Bia",
      "plural": "Biases",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    },
    "bias_score": {
      "machine": "bias_score",
      "singular": "Bias Score",
      "plural": "Bias Scores",
      "field_type": "integer",
      "data_type": "number",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    },
    "blinding": {
      "machine": "blinding",
      "singular": "Blinding",
      "plural": "Blindings",
      "field_type": "boolean",
      "data_type": "boolean",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },
    "status": {
      "machine": "status",
      "singular": "Status",
      "plural": "Statuses",
      "field_type": "enum",
      "data_type": "string",
      "cardinality": 1,
      "default": "ongoing",
      "required": true,
      "example": "ongoing, completed",
      "options": [
        {
          "label": "Ongoing",
          "id": "ongoing"
        },
        {
          "label": "Completed",
          "id": "completed"
        }
      ]
    },
    "trial_phase": {
      "machine": "trial_phase",
      "singular": "Trial Phase",
      "plural": "Trial Phases",
      "field_type": "enum",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": "Phase 1, Phase 2, Phase 3, Phase 4",
      "options": [
        {
          "label": "Phase 1",
          "id": "phase_1"
        },
        {
          "label": "Phase 2",
          "id": "phase_2"
        },
        {
          "label": "Phase 3",
          "id": "phase_3"
        },
        {
          "label": "Phase 4",
          "id": "phase_4"
        }
      ]
    },
    "pros": {
      "machine": "pros",
      "singular": "Patient Reported Outcome",
      "plural": "Patient Reported Outcomeses",
      "field_type": "integer",
      "data_type": "number",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    },
    "clinros": {
      "machine": "clinros",
      "singular": "Clinical Reported Outcome",
      "plural": "Clinical Reported Outcomeses",
      "field_type": "integer",
      "data_type": "number",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    },
    "performance_outcomes": {
      "machine": "performance_outcomes",
      "singular": "Performance Outcome",
      "plural": "Performance Outcomeses",
      "field_type": "integer",
      "data_type": "number",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    },
    "composite_score": {
      "machine": "composite_score",
      "singular": "Composite Score",
      "plural": "Composite Scores",
      "field_type": "integer",
      "data_type": "number",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    },
    "complexity_score": {
      "machine": "complexity_score",
      "singular": "Complexity Score",
      "plural": "Complexity Scores",
      "field_type": "integer",
      "data_type": "number",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    },
    "success_rate": {
      "machine": "success_rate",
      "singular": "Success Rate",
      "plural": "Success Rates",
      "field_type": "percentage",
      "data_type": "number",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    },
    "side_effects": {
      "machine": "side_effects",
      "singular": "Side Effect",
      "plural": "Side Effectss",
      "relationship": "Drugs",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": Infinity,
      "default": "",
      "required": false,
      "example": ""
    }
  },
  "DrugComparisons": {
    "title": {
      "machine": "title",
      "singular": "Title",
      "plural": "Titles",
      "field_type": "text",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": ""
    },
    "url_alias": {
      "machine": "url_alias",
      "singular": "URL Alia",
      "plural": "URL Aliases",
      "field_type": "slug",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    },
    "drug": {
      "machine": "drug",
      "singular": "Drug",
      "plural": "Drugs",
      "relationship": "Drugs",
      "field_type": "type_reference",
      "data_type": "RelEntity",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": "Aspirin, Ibuprofen"
    },
    "comparison_criteria": {
      "machine": "comparison_criteria",
      "singular": "Comparison Criterion",
      "plural": "Comparison Criterias",
      "field_type": "json",
      "data_type": "object",
      "cardinality": 1,
      "default": "",
      "required": true,
      "example": "efficacy, side effects, cost, duration"
    },
    "expires": {
      "machine": "expires",
      "singular": "Expire",
      "plural": "Expireses",
      "field_type": "date",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    },
    "ai_answer": {
      "machine": "ai_answer",
      "singular": "AI Answer",
      "plural": "AI Answers",
      "field_type": "textarea",
      "data_type": "string",
      "cardinality": 1,
      "default": "",
      "required": false,
      "example": ""
    }
  }
}
//---OBJECT-ACTIONS-TYPE-CONSTANTS-ENDS---//

//---OBJECT-ACTIONS-TYPE-SCHEMA-STARTS---//


export interface SuperModel {
    readonly id: number | string; 
    author: RelEntity<'Users'>;
    created_at: string;
    modified_at: string;
    _type: ModelName;
}

export interface Users {
	readonly id: number | string
	_type: ModelName
	is_active?: boolean
	is_staff?: boolean
	last_login?: string
	date_joined?: string
	email?: string
	username?: string
	first_name?: string
	last_name?: string
	groups?: string[]
	phone: string;
}

export interface Drugs extends SuperModel {
	name: string;
	description?: string | null;
	approval_status: string;
	manufacturer: RelEntity<"Manufacturers">;
  side_effects_to_type_reference: RelEntity<"Trials">[] | RelEntity<"SideEffects">[];
	target_cost?: number | null;
	full_treatment_duration?: string | null;
}
export interface SideEffects extends SuperModel {
	name: string;
}
export interface DrugEffects extends SuperModel {
	drug: RelEntity<"Drugs">;
	side_effect: RelEntity<"SideEffects">;
	severity: string;
	reported_count: number;
}
export interface Manufacturers extends SuperModel {
	name: string;
	location?: string | null;
	contact_info?: string | null;
}

export type TrialPhase = 'phase_1' | 'phase_2' | 'phase_3' | 'phase_4';
export type TrialStatus = 'ongoing' | 'completed' | 'suspended' | 'terminated';

export interface Trials extends SuperModel {
	title: string;
	drug: RelEntity<"Drugs">;
	sample_size: number;
	study_design: string;
	study_duration: string;
	health_status: string;
	external_factors: string;
	age_range: string;
	bias?: string | null;
	bias_score?: number | null;
	blinding: boolean;
	trial_phase: TrialPhase;
  status: TrialStatus;
	pros?: number | null;
	clinros?: number | null;
	performance_outcomes?: number | null;
	composite_score?: number | null;
	complexity_score?: number | null;
	success_rate?: number | null;
	side_effects?: RelEntity<"Drugs">[] | null;
}

export type ComparisonCriterion = 'attributes' | 'efficacy' | 'side_effects' | 'cost' | 'duration' | 'safety' | 'convenience' | 'availability';

export interface DrugComparisons extends SuperModel {
  title: string;
	url_alias?: string | null;
	drugs: RelEntity<"Drugs">[];
	comparison_criteria: ComparisonCriterion[];
	expires?: string | null;
	ai_answer?: string | null;
}
//---OBJECT-ACTIONS-TYPE-SCHEMA-ENDS---//

//---OBJECT-ACTIONS-NAV-ITEMS-STARTS---//
export interface NavItem<T extends ModelName = ModelName> {
  singular: string;
  plural: string;
  segment: string;
  api: string;
  icon?: string;
  type: T;
  model_type?: 'vocabulary' | string;
  search_fields: string[];
  permissions: 'AllowAny' | 'IsAuthenticatedOrReadOnly' | 'IsAuthenticated' | 'IsAdmin';
}

export const NAVITEMS: { [K in ModelName]: NavItem<K> }[ModelName][] = [
  {
    "singular": "User",
    "plural": "Users",
    "type": "Users",
    "segment": "users",
    "api": "/api/users",
    "icon": "PersonOutline",
    "search_fields": [
      "first_name",
      "last_name"
    ],
    "permissions": "IsAdmin"
  },
  {
    "singular": "Drug",
    "plural": "Drugs",
    "type": "Drugs",
    "segment": "drugs",
    "api": "/api/drugs",
    "icon": "Medication",
    "search_fields": [
      "name"
    ],
    "permissions": "AllowAny"
  },
  {
    "singular": "Side Effect",
    "plural": "Side Effects",
    "type": "SideEffects",
    "segment": "side-effects",
    "api": "/api/side-effects",
    "icon": "WarningAmber",
    "search_fields": [
      "name"
    ],
    "model_type": "vocabulary",
    "permissions": "IsAdmin"
  },
  {
    "singular": "Drug Effect",
    "plural": "Drug Effects",
    "type": "DrugEffects",
    "segment": "drug-effects",
    "api": "/api/drug-effects",
    "icon": "LocalHospital",
    "search_fields": [
      "drug__name",
      "side_effect__name"
    ],
    "permissions": "IsAuthenticatedOrReadOnly"
  },
  {
    "singular": "Manufacturer",
    "plural": "Manufacturers",
    "type": "Manufacturers",
    "segment": "manufacturers",
    "api": "/api/manufacturers",
    "icon": "Factory",
    "search_fields": [
      "name"
    ],
    "permissions": "AllowAny"
  },
  {
    "singular": "Trial",
    "plural": "Trials",
    "type": "Trials",
    "segment": "trials",
    "api": "/api/trials",
    "icon": "Science",
    "search_fields": [
      "title"
    ],
    "permissions": "IsAuthenticatedOrReadOnly"
  },
  {
    "singular": "Drug Comparison",
    "plural": "Drug Comparisons",
    "type": "DrugComparisons",
    "segment": "drug-comparisons",
    "api": "/api/drug-comparisons",
    "icon": "CompareArrows",
    "search_fields": [
      "drug__name"
    ],
    "permissions": "IsAuthenticatedOrReadOnly"
  }
]
//---OBJECT-ACTIONS-NAV-ITEMS-ENDS---//