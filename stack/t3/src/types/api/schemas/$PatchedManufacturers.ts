/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PatchedManufacturers = {
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
    name: {
      type: 'string',
      maxLength: 255,
    },
    location: {
      type: 'string',
      isNullable: true,
      maxLength: 255,
    },
    contact_info: {
      type: 'string',
      isNullable: true,
      maxLength: 255,
    },
    author: {
      type: 'number',
      isNullable: true,
    },
  },
} as const;
