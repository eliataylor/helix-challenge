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

export function getProp<T extends ModelName, K extends keyof ModelType<T>>(
  entity: ModelType<T>,
  key: K
): ModelType<T>[K] | null {
  if (key in entity) return entity[key];
  return null;
}

export function restructureAsAllEntities<T extends ModelName>(
  modelName: T,
  entity: Partial<ModelType<T>>
): ModelType<T> {
  const schema = TypeFieldSchema[modelName];
  const result: any = { id: entity.id || 0, _type: modelName };

  Object.entries(schema).forEach(([key, field]) => {
    const value = (entity as any)[key];

    if (field.data_type === 'RelEntity') {
      if (!value) {
        // Skip undefined values
      } else if (Array.isArray(value)) {
        // Transform array of RelEntities
        result[key] = value.map((item) =>
          item.entity ? restructureAsAllEntities(item._type as ModelName, item.entity) : item
        );
      } else if (value.entity) {
        // Transform single RelEntity
        result[key] = value.entity ?
          restructureAsAllEntities(value._type as ModelName, value.entity) :
          value;
      } else {
        result[key] = { id: value.id };
      }
    } else if (value !== undefined) {
      result[key] = value;
    }
  });
  return result as ModelType<T>;
}
//---OBJECT-ACTIONS-API-RESP-ENDS---//

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
}

export const NAVITEMS: { [K in ModelName]: NavItem<K> }[ModelName][] = [
  {
    "singular": "User",
    "plural": "Users",
    "type": "Users",
    "segment": "users",
    "api": "/api/users",
    "search_fields": [
      "first_name",
      "last_name"
    ]
  },
  {
    "singular": "Drug",
    "plural": "Drugs",
    "type": "Drugs",
    "segment": "drugs",
    "api": "/api/drugs",
    "search_fields": [
      "name"
    ]
  },
  {
    "singular": "Side Effect",
    "plural": "Side Effects",
    "type": "SideEffects",
    "segment": "side-effects",
    "api": "/api/side-effects",
    "search_fields": [
      "name"
    ],
    "model_type": "vocabulary"
  },
  {
    "singular": "Drug Effect",
    "plural": "Drug Effects",
    "type": "DrugEffects",
    "segment": "drug-effects",
    "api": "/api/drug-effects",
    "search_fields": [
      "drug__name",
      "side_effect__name"
    ]
  },
  {
    "singular": "Manufacturer",
    "plural": "Manufacturers",
    "type": "Manufacturers",
    "segment": "manufacturers",
    "api": "/api/manufacturers",
    "search_fields": [
      "name"
    ]
  },
  {
    "singular": "Trial",
    "plural": "Trials",
    "type": "Trials",
    "segment": "trials",
    "api": "/api/trials",
    "search_fields": [
      "title"
    ]
  },
  {
    "singular": "Drug Comparison",
    "plural": "Drug Comparisons",
    "type": "DrugComparisons",
    "segment": "drug-comparisons",
    "api": "/api/drug-comparisons",
    "search_fields": [
      "drug__name"
    ]
  }
]
//---OBJECT-ACTIONS-NAV-ITEMS-ENDS---//

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
      "example": ""
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
      "field_type": "text",
      "data_type": "string",
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
      "field_type": "percent",
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
	_type: string
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
	bias_score?: string | null;
	blinding: boolean;
	status: string;
	trial_phase: string;
	pros?: number | null;
	clinros?: number | null;
	performance_outcomes?: number | null;
	composite_score?: number | null;
	complexity_score?: number | null;
	success_rate?: number | null;
	side_effects?: RelEntity<"Drugs">[] | null;
}
export interface DrugComparisons extends SuperModel {
	url_alias?: string | null;
	drug: RelEntity<"Drugs">;
	comparison_criteria: object;
	expires?: string | null;
	ai_answer?: string | null;
}
//---OBJECT-ACTIONS-TYPE-SCHEMA-ENDS---//