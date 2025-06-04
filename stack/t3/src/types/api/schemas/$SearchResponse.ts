/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SearchResponse = {
  properties: {
    results: {
      type: 'dictionary',
      contains: {
        type: 'SearchResult',
      },
      isRequired: true,
    },
    query: {
      type: 'string',
      description: `Search term used`,
      isRequired: true,
    },
    selected_types: {
      type: 'array',
      contains: {
        type: 'string',
      },
      isRequired: true,
    },
  },
} as const;
