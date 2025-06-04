/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Trials = {
  properties: {
    id: {
      type: 'number',
      isReadOnly: true,
      isRequired: true,
    },
    created_at: {
      type: 'string',
      isReadOnly: true,
      isRequired: true,
      format: 'date-time',
    },
    modified_at: {
      type: 'string',
      isReadOnly: true,
      isRequired: true,
      format: 'date-time',
    },
    title: {
      type: 'string',
      isRequired: true,
      maxLength: 255,
    },
    sample_size: {
      type: 'number',
      isRequired: true,
      maximum: 2147483647,
      minimum: -2147483648,
    },
    study_design: {
      type: 'string',
      isRequired: true,
    },
    study_duration: {
      type: 'string',
      isRequired: true,
      maxLength: 255,
    },
    health_status: {
      type: 'string',
      isRequired: true,
      maxLength: 255,
    },
    external_factors: {
      type: 'string',
      isRequired: true,
      maxLength: 255,
    },
    age_range: {
      type: 'string',
      isRequired: true,
      maxLength: 255,
    },
    bias: {
      type: 'string',
      isNullable: true,
      maxLength: 255,
    },
    bias_score: {
      type: 'number',
      isNullable: true,
      maximum: 2147483647,
      minimum: -2147483648,
    },
    blinding: {
      type: 'boolean',
      isRequired: true,
    },
    status: {
      type: 'StatusEnum',
    },
    trial_phase: {
      type: 'TrialPhaseEnum',
      isRequired: true,
    },
    pros: {
      type: 'number',
      isNullable: true,
      maximum: 2147483647,
      minimum: -2147483648,
    },
    clinros: {
      type: 'number',
      isNullable: true,
      maximum: 2147483647,
      minimum: -2147483648,
    },
    performance_outcomes: {
      type: 'number',
      isNullable: true,
      maximum: 2147483647,
      minimum: -2147483648,
    },
    composite_score: {
      type: 'number',
      isNullable: true,
      maximum: 2147483647,
      minimum: -2147483648,
    },
    complexity_score: {
      type: 'number',
      isNullable: true,
      maximum: 2147483647,
      minimum: -2147483648,
    },
    success_rate: {
      type: 'string',
      isNullable: true,
      format: 'decimal',
      pattern: '^-?\\d{0,8}(?:\\.\\d{0,2})?$',
    },
    author: {
      type: 'number',
      isNullable: true,
    },
    drug: {
      type: 'number',
      isNullable: true,
    },
    drug_effects: {
      type: 'array',
      contains: {
        type: 'number',
      },
    },
  },
} as const;
