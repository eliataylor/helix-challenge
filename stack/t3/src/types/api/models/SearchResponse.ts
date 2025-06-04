/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResult } from './SearchResult';
export type SearchResponse = {
  /**
   * Search results grouped by type
   */
  results: Record<string, SearchResult>;
  /**
   * Search term used
   */
  query: string;
  /**
   * Types that were searched
   */
  selected_types: Array<string>;
};

