/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DrugComparisons = {
  readonly id: number;
  readonly created_at: string;
  readonly modified_at: string;
  title: string;
  url_alias?: string | null;
  comparison_criteria: any;
  expires?: string | null;
  ai_answer?: string | null;
  author?: number | null;
  drugs?: Array<number | null>;
};

