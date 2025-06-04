/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DrugComparisons = {
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
    url_alias: {
      type: 'string',
      isNullable: true,
      maxLength: 50,
      pattern: '^[-a-zA-Z0-9_]+$',
    },
    comparison_criteria: {
      properties: {
      },
      isRequired: true,
    },
    expires: {
      type: 'string',
      isNullable: true,
      format: 'date',
    },
    ai_answer: {
      type: 'string',
      isNullable: true,
    },
    author: {
      type: 'number',
      isNullable: true,
    },
    drugs: {
      type: 'array',
      contains: {
        type: 'number',
        isNullable: true,
      },
    },
  },
} as const;
