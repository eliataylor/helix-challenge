/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SearchResult = {
  properties: {
    items: {
      type: 'array',
      contains: {
        type: 'dictionary',
        contains: {
          properties: {
          },
        },
      },
      isRequired: true,
    },
    count: {
      type: 'number',
      isRequired: true,
    },
  },
} as const;
