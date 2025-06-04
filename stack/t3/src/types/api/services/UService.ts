/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DrugComparisons } from '../models/DrugComparisons';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UService {
  /**
   * @param urlAlias
   * @returns DrugComparisons
   * @throws ApiError
   */
  public static uDrugcomparisonsRetrieve(
    urlAlias: string,
  ): CancelablePromise<DrugComparisons> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/u/drugcomparisons/{url_alias}',
      path: {
        'url_alias': urlAlias,
      },
    });
  }
}
