/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResponse } from '../models/SearchResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SearchService {
  /**
   *
   * Search endpoint that searches across multiple content types.
   * Returns grouped results by type with counts and metadata.
   *
   * @param query Search term to look for across selected types
   * @param types Comma-separated list of types to search in (e.g. Drugs,Manufacturers)
   * @returns SearchResponse
   * @throws ApiError
   */
  public static apiSearchRetrieve(
    query: string,
    types: string,
  ): CancelablePromise<SearchResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/search',
      query: {
        'query': query,
        'types': types,
      },
      errors: {
        400: `No response body`,
      },
    });
  }
}
