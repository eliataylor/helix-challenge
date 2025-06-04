/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Drugs = {
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
    name: {
      type: 'string',
      isRequired: true,
      maxLength: 255,
    },
    description: {
      type: 'string',
      isNullable: true,
      maxLength: 255,
    },
    approval_status: {
      type: 'ApprovalStatusEnum',
    },
    target_cost: {
      type: 'number',
      isNullable: true,
      maximum: 2147483647,
      minimum: -2147483648,
    },
    full_treatment_duration: {
      type: 'string',
      isNullable: true,
      maxLength: 255,
    },
    author: {
      type: 'number',
      isNullable: true,
    },
    manufacturer: {
      type: 'number',
      isNullable: true,
    },
    drug_effects: {
      type: 'array',
      contains: {
        type: 'number',
        isNullable: true,
      },
    },
  },
} as const;
