/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PatchedDrugComparisons = {
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
    url_alias: {
      type: 'string',
      isNullable: true,
      maxLength: 50,
      pattern: '^[-a-zA-Z0-9_]+$',
    },
    comparison_criteria: {
      properties: {
      },
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
