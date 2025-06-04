/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PatchedTrials = {
  properties: {
    id: {
      type: 'number',
      isReadOnly: true,
    },
    created_at: {
      type: 'string',
      isReadOnly: true,
      format: 'date-time',
    },
    modified_at: {
      type: 'string',
      isReadOnly: true,
      format: 'date-time',
    },
    title: {
      type: 'string',
      maxLength: 255,
    },
    sample_size: {
      type: 'number',
      maximum: 2147483647,
      minimum: -2147483648,
    },
    study_design: {
      type: 'string',
    },
    study_duration: {
      type: 'string',
      maxLength: 255,
    },
    health_status: {
      type: 'string',
      maxLength: 255,
    },
    external_factors: {
      type: 'string',
      maxLength: 255,
    },
    age_range: {
      type: 'string',
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
    },
    status: {
      type: 'StatusEnum',
    },
    trial_phase: {
      type: 'TrialPhaseEnum',
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
