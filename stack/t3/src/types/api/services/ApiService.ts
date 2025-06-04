/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DrugComparisons } from '../models/DrugComparisons';
import type { DrugEffects } from '../models/DrugEffects';
import type { Drugs } from '../models/Drugs';
import type { Manufacturers } from '../models/Manufacturers';
import type { OATester } from '../models/OATester';
import type { PaginatedDrugComparisonsList } from '../models/PaginatedDrugComparisonsList';
import type { PaginatedDrugEffectsList } from '../models/PaginatedDrugEffectsList';
import type { PaginatedDrugsList } from '../models/PaginatedDrugsList';
import type { PaginatedManufacturersList } from '../models/PaginatedManufacturersList';
import type { PaginatedOATesterList } from '../models/PaginatedOATesterList';
import type { PaginatedSchemaVersionList } from '../models/PaginatedSchemaVersionList';
import type { PaginatedSideEffectsList } from '../models/PaginatedSideEffectsList';
import type { PaginatedTrialsList } from '../models/PaginatedTrialsList';
import type { PaginatedUsersList } from '../models/PaginatedUsersList';
import type { PatchedDrugComparisons } from '../models/PatchedDrugComparisons';
import type { PatchedDrugEffects } from '../models/PatchedDrugEffects';
import type { PatchedDrugs } from '../models/PatchedDrugs';
import type { PatchedManufacturers } from '../models/PatchedManufacturers';
import type { PatchedOATester } from '../models/PatchedOATester';
import type { PatchedSchemaVersion } from '../models/PatchedSchemaVersion';
import type { PatchedSideEffects } from '../models/PatchedSideEffects';
import type { PatchedTrials } from '../models/PatchedTrials';
import type { PatchedUsers } from '../models/PatchedUsers';
import type { SchemaVersion } from '../models/SchemaVersion';
import type { SideEffects } from '../models/SideEffects';
import type { Trials } from '../models/Trials';
import type { Users } from '../models/Users';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApiService {
  /**
   * @param limit Number of results to return per page.
   * @param offset The initial index from which to return the results.
   * @param search A search term.
   * @returns PaginatedDrugComparisonsList
   * @throws ApiError
   */
  public static apiDrugComparisonsList(
    limit?: number,
    offset?: number,
    search?: string,
  ): CancelablePromise<PaginatedDrugComparisonsList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/drug-comparisons',
      query: {
        'limit': limit,
        'offset': offset,
        'search': search,
      },
    });
  }
  /**
   * @param requestBody
   * @returns DrugComparisons
   * @throws ApiError
   */
  public static apiDrugComparisonsCreate(
    requestBody: DrugComparisons,
  ): CancelablePromise<DrugComparisons> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/drug-comparisons',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Drug Comparison.
   * @returns DrugComparisons
   * @throws ApiError
   */
  public static apiDrugComparisonsRetrieve(
    id: number,
  ): CancelablePromise<DrugComparisons> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/drug-comparisons/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param id A unique integer value identifying this Drug Comparison.
   * @param requestBody
   * @returns DrugComparisons
   * @throws ApiError
   */
  public static apiDrugComparisonsUpdate(
    id: number,
    requestBody: DrugComparisons,
  ): CancelablePromise<DrugComparisons> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/drug-comparisons/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Drug Comparison.
   * @param requestBody
   * @returns DrugComparisons
   * @throws ApiError
   */
  public static apiDrugComparisonsPartialUpdate(
    id: number,
    requestBody?: PatchedDrugComparisons,
  ): CancelablePromise<DrugComparisons> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/drug-comparisons/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Drug Comparison.
   * @returns void
   * @throws ApiError
   */
  public static apiDrugComparisonsDestroy(
    id: number,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/drug-comparisons/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param limit Number of results to return per page.
   * @param offset The initial index from which to return the results.
   * @param search A search term.
   * @returns PaginatedDrugEffectsList
   * @throws ApiError
   */
  public static apiDrugEffectsList(
    limit?: number,
    offset?: number,
    search?: string,
  ): CancelablePromise<PaginatedDrugEffectsList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/drug-effects',
      query: {
        'limit': limit,
        'offset': offset,
        'search': search,
      },
    });
  }
  /**
   * @param requestBody
   * @returns DrugEffects
   * @throws ApiError
   */
  public static apiDrugEffectsCreate(
    requestBody: DrugEffects,
  ): CancelablePromise<DrugEffects> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/drug-effects',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Drug Effect.
   * @returns DrugEffects
   * @throws ApiError
   */
  public static apiDrugEffectsRetrieve(
    id: number,
  ): CancelablePromise<DrugEffects> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/drug-effects/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param id A unique integer value identifying this Drug Effect.
   * @param requestBody
   * @returns DrugEffects
   * @throws ApiError
   */
  public static apiDrugEffectsUpdate(
    id: number,
    requestBody: DrugEffects,
  ): CancelablePromise<DrugEffects> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/drug-effects/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Drug Effect.
   * @param requestBody
   * @returns DrugEffects
   * @throws ApiError
   */
  public static apiDrugEffectsPartialUpdate(
    id: number,
    requestBody?: PatchedDrugEffects,
  ): CancelablePromise<DrugEffects> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/drug-effects/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Drug Effect.
   * @returns void
   * @throws ApiError
   */
  public static apiDrugEffectsDestroy(
    id: number,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/drug-effects/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param limit Number of results to return per page.
   * @param offset The initial index from which to return the results.
   * @param search A search term.
   * @returns PaginatedDrugsList
   * @throws ApiError
   */
  public static apiDrugsList(
    limit?: number,
    offset?: number,
    search?: string,
  ): CancelablePromise<PaginatedDrugsList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/drugs',
      query: {
        'limit': limit,
        'offset': offset,
        'search': search,
      },
    });
  }
  /**
   * @param requestBody
   * @returns Drugs
   * @throws ApiError
   */
  public static apiDrugsCreate(
    requestBody: Drugs,
  ): CancelablePromise<Drugs> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/drugs',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Drug.
   * @returns Drugs
   * @throws ApiError
   */
  public static apiDrugsRetrieve(
    id: number,
  ): CancelablePromise<Drugs> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/drugs/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param id A unique integer value identifying this Drug.
   * @param requestBody
   * @returns Drugs
   * @throws ApiError
   */
  public static apiDrugsUpdate(
    id: number,
    requestBody: Drugs,
  ): CancelablePromise<Drugs> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/drugs/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Drug.
   * @param requestBody
   * @returns Drugs
   * @throws ApiError
   */
  public static apiDrugsPartialUpdate(
    id: number,
    requestBody?: PatchedDrugs,
  ): CancelablePromise<Drugs> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/drugs/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Drug.
   * @returns void
   * @throws ApiError
   */
  public static apiDrugsDestroy(
    id: number,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/drugs/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param limit Number of results to return per page.
   * @param offset The initial index from which to return the results.
   * @param search A search term.
   * @returns PaginatedManufacturersList
   * @throws ApiError
   */
  public static apiManufacturersList(
    limit?: number,
    offset?: number,
    search?: string,
  ): CancelablePromise<PaginatedManufacturersList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/manufacturers',
      query: {
        'limit': limit,
        'offset': offset,
        'search': search,
      },
    });
  }
  /**
   * @param requestBody
   * @returns Manufacturers
   * @throws ApiError
   */
  public static apiManufacturersCreate(
    requestBody: Manufacturers,
  ): CancelablePromise<Manufacturers> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/manufacturers',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Manufacturer.
   * @returns Manufacturers
   * @throws ApiError
   */
  public static apiManufacturersRetrieve(
    id: number,
  ): CancelablePromise<Manufacturers> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/manufacturers/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param id A unique integer value identifying this Manufacturer.
   * @param requestBody
   * @returns Manufacturers
   * @throws ApiError
   */
  public static apiManufacturersUpdate(
    id: number,
    requestBody: Manufacturers,
  ): CancelablePromise<Manufacturers> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/manufacturers/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Manufacturer.
   * @param requestBody
   * @returns Manufacturers
   * @throws ApiError
   */
  public static apiManufacturersPartialUpdate(
    id: number,
    requestBody?: PatchedManufacturers,
  ): CancelablePromise<Manufacturers> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/manufacturers/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Manufacturer.
   * @returns void
   * @throws ApiError
   */
  public static apiManufacturersDestroy(
    id: number,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/manufacturers/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * List all users in the 'oa-tester' group.
   * @param page A page number within the paginated result set.
   * @param pageSize Number of results to return per page.
   * @returns PaginatedOATesterList
   * @throws ApiError
   */
  public static apiOaTestersList(
    page?: number,
    pageSize?: number,
  ): CancelablePromise<PaginatedOATesterList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/oa-testers',
      query: {
        'page': page,
        'page_size': pageSize,
      },
    });
  }
  /**
   * Create a new user and add them to the 'oa-tester' group.
   * @param requestBody
   * @returns OATester
   * @throws ApiError
   */
  public static apiOaTestersCreate(
    requestBody: OATester,
  ): CancelablePromise<OATester> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/oa-testers',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Retrieve a specific 'oa-tester' user by ID.
   * @param id A unique integer value identifying this User.
   * @returns OATester
   * @throws ApiError
   */
  public static apiOaTestersRetrieve(
    id: number,
  ): CancelablePromise<OATester> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/oa-testers/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * Add the 'oa-tester' group to a specific user by ID.
   * @param id A unique integer value identifying this User.
   * @param requestBody
   * @returns OATester
   * @throws ApiError
   */
  public static apiOaTestersUpdate(
    id: number,
    requestBody: OATester,
  ): CancelablePromise<OATester> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/oa-testers/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Add the 'oa-tester' group to a specific user by ID.
   * @param id A unique integer value identifying this User.
   * @param requestBody
   * @returns OATester
   * @throws ApiError
   */
  public static apiOaTestersPartialUpdate(
    id: number,
    requestBody?: PatchedOATester,
  ): CancelablePromise<OATester> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/oa-testers/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Delete a specific 'oa-tester' user by ID, along with their content.
   * @param id A unique integer value identifying this User.
   * @returns void
   * @throws ApiError
   */
  public static apiOaTestersDestroy(
    id: number,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/oa-testers/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @returns OATester
   * @throws ApiError
   */
  public static apiOaTestersSearchRetrieve(): CancelablePromise<OATester> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/oa-testers/search',
    });
  }
  /**
   * OpenApi3 schema for this API. Format can be selected via content negotiation.
   *
   * - YAML: application/vnd.oai.openapi
   * - JSON: application/vnd.oai.openapi+json
   * @param format
   * @param lang
   * @returns any
   * @throws ApiError
   */
  public static apiSchemaRetrieve(
    format?: 'json' | 'yaml',
    lang?: 'af' | 'ar' | 'ar-dz' | 'ast' | 'az' | 'be' | 'bg' | 'bn' | 'br' | 'bs' | 'ca' | 'ckb' | 'cs' | 'cy' | 'da' | 'de' | 'dsb' | 'el' | 'en' | 'en-au' | 'en-gb' | 'eo' | 'es' | 'es-ar' | 'es-co' | 'es-mx' | 'es-ni' | 'es-ve' | 'et' | 'eu' | 'fa' | 'fi' | 'fr' | 'fy' | 'ga' | 'gd' | 'gl' | 'he' | 'hi' | 'hr' | 'hsb' | 'hu' | 'hy' | 'ia' | 'id' | 'ig' | 'io' | 'is' | 'it' | 'ja' | 'ka' | 'kab' | 'kk' | 'km' | 'kn' | 'ko' | 'ky' | 'lb' | 'lt' | 'lv' | 'mk' | 'ml' | 'mn' | 'mr' | 'ms' | 'my' | 'nb' | 'ne' | 'nl' | 'nn' | 'os' | 'pa' | 'pl' | 'pt' | 'pt-br' | 'ro' | 'ru' | 'sk' | 'sl' | 'sq' | 'sr' | 'sr-latn' | 'sv' | 'sw' | 'ta' | 'te' | 'tg' | 'th' | 'tk' | 'tr' | 'tt' | 'udm' | 'ug' | 'uk' | 'ur' | 'uz' | 'vi' | 'zh-hans' | 'zh-hant',
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/schema',
      query: {
        'format': format,
        'lang': lang,
      },
    });
  }
  /**
   * @param limit Number of results to return per page.
   * @param offset The initial index from which to return the results.
   * @param search A search term.
   * @returns PaginatedSideEffectsList
   * @throws ApiError
   */
  public static apiSideEffectsList(
    limit?: number,
    offset?: number,
    search?: string,
  ): CancelablePromise<PaginatedSideEffectsList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/side-effects',
      query: {
        'limit': limit,
        'offset': offset,
        'search': search,
      },
    });
  }
  /**
   * @param requestBody
   * @returns SideEffects
   * @throws ApiError
   */
  public static apiSideEffectsCreate(
    requestBody: SideEffects,
  ): CancelablePromise<SideEffects> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/side-effects',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Side Effect.
   * @returns SideEffects
   * @throws ApiError
   */
  public static apiSideEffectsRetrieve(
    id: number,
  ): CancelablePromise<SideEffects> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/side-effects/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param id A unique integer value identifying this Side Effect.
   * @param requestBody
   * @returns SideEffects
   * @throws ApiError
   */
  public static apiSideEffectsUpdate(
    id: number,
    requestBody: SideEffects,
  ): CancelablePromise<SideEffects> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/side-effects/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Side Effect.
   * @param requestBody
   * @returns SideEffects
   * @throws ApiError
   */
  public static apiSideEffectsPartialUpdate(
    id: number,
    requestBody?: PatchedSideEffects,
  ): CancelablePromise<SideEffects> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/side-effects/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Side Effect.
   * @returns void
   * @throws ApiError
   */
  public static apiSideEffectsDestroy(
    id: number,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/side-effects/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param limit Number of results to return per page.
   * @param offset The initial index from which to return the results.
   * @param search A search term.
   * @returns PaginatedTrialsList
   * @throws ApiError
   */
  public static apiTrialsList(
    limit?: number,
    offset?: number,
    search?: string,
  ): CancelablePromise<PaginatedTrialsList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/trials',
      query: {
        'limit': limit,
        'offset': offset,
        'search': search,
      },
    });
  }
  /**
   * @param requestBody
   * @returns Trials
   * @throws ApiError
   */
  public static apiTrialsCreate(
    requestBody: Trials,
  ): CancelablePromise<Trials> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/trials',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Trial.
   * @returns Trials
   * @throws ApiError
   */
  public static apiTrialsRetrieve(
    id: number,
  ): CancelablePromise<Trials> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/trials/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param id A unique integer value identifying this Trial.
   * @param requestBody
   * @returns Trials
   * @throws ApiError
   */
  public static apiTrialsUpdate(
    id: number,
    requestBody: Trials,
  ): CancelablePromise<Trials> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/trials/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Trial.
   * @param requestBody
   * @returns Trials
   * @throws ApiError
   */
  public static apiTrialsPartialUpdate(
    id: number,
    requestBody?: PatchedTrials,
  ): CancelablePromise<Trials> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/trials/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Trial.
   * @returns void
   * @throws ApiError
   */
  public static apiTrialsDestroy(
    id: number,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/trials/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param limit Number of results to return per page.
   * @param offset The initial index from which to return the results.
   * @param search A search term.
   * @returns PaginatedUsersList
   * @throws ApiError
   */
  public static apiUsersList(
    limit?: number,
    offset?: number,
    search?: string,
  ): CancelablePromise<PaginatedUsersList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users',
      query: {
        'limit': limit,
        'offset': offset,
        'search': search,
      },
    });
  }
  /**
   * @param requestBody
   * @returns Users
   * @throws ApiError
   */
  public static apiUsersCreate(
    requestBody: Users,
  ): CancelablePromise<Users> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/users',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this User.
   * @returns Users
   * @throws ApiError
   */
  public static apiUsersRetrieve(
    id: number,
  ): CancelablePromise<Users> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param id A unique integer value identifying this User.
   * @param requestBody
   * @returns Users
   * @throws ApiError
   */
  public static apiUsersUpdate(
    id: number,
    requestBody: Users,
  ): CancelablePromise<Users> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/users/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this User.
   * @param requestBody
   * @returns Users
   * @throws ApiError
   */
  public static apiUsersPartialUpdate(
    id: number,
    requestBody?: PatchedUsers,
  ): CancelablePromise<Users> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/users/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this User.
   * @returns void
   * @throws ApiError
   */
  public static apiUsersDestroy(
    id: number,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/users/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param modelName
   * @param userId
   * @param search Search term
   * @returns any
   * @throws ApiError
   */
  public static apiUsersListRetrieve(
    modelName: string,
    userId: number,
    search?: string,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users/{user_id}/{model_name}/list',
      path: {
        'model_name': modelName,
        'user_id': userId,
      },
      query: {
        'search': search,
      },
    });
  }
  /**
   * @param modelName
   * @param userId
   * @returns any No response body
   * @throws ApiError
   */
  public static apiUsersStatsRetrieve(
    modelName: string,
    userId: number,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/users/{user_id}/{model_name}/stats',
      path: {
        'model_name': modelName,
        'user_id': userId,
      },
    });
  }
  /**
   * @param limit Number of results to return per page.
   * @param offset The initial index from which to return the results.
   * @returns PaginatedSchemaVersionList
   * @throws ApiError
   */
  public static apiWorksheetsList(
    limit?: number,
    offset?: number,
  ): CancelablePromise<PaginatedSchemaVersionList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/worksheets',
      query: {
        'limit': limit,
        'offset': offset,
      },
    });
  }
  /**
   * @param requestBody
   * @returns SchemaVersion
   * @throws ApiError
   */
  public static apiWorksheetsCreate(
    requestBody: SchemaVersion,
  ): CancelablePromise<SchemaVersion> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/worksheets',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Schema Version.
   * @returns SchemaVersion
   * @throws ApiError
   */
  public static apiWorksheetsRetrieve(
    id: number,
  ): CancelablePromise<SchemaVersion> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/worksheets/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param id A unique integer value identifying this Schema Version.
   * @param requestBody
   * @returns SchemaVersion
   * @throws ApiError
   */
  public static apiWorksheetsUpdate(
    id: number,
    requestBody: SchemaVersion,
  ): CancelablePromise<SchemaVersion> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/worksheets/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Schema Version.
   * @param requestBody
   * @returns SchemaVersion
   * @throws ApiError
   */
  public static apiWorksheetsPartialUpdate(
    id: number,
    requestBody?: PatchedSchemaVersion,
  ): CancelablePromise<SchemaVersion> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/worksheets/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id A unique integer value identifying this Schema Version.
   * @returns void
   * @throws ApiError
   */
  public static apiWorksheetsDestroy(
    id: number,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/worksheets/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * Delete a specific version of a schema.
   * Only the author can delete their versions.
   * @param id A unique integer value identifying this Schema Version.
   * @returns void
   * @throws ApiError
   */
  public static apiWorksheetsDeleteVersionDestroy(
    id: number,
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/worksheets/{id}/delete-version',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param id A unique integer value identifying this Schema Version.
   * @returns SchemaVersion
   * @throws ApiError
   */
  public static apiWorksheetsDownloadRetrieve(
    id: number,
  ): CancelablePromise<SchemaVersion> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/worksheets/{id}/download',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param id A unique integer value identifying this Schema Version.
   * @param requestBody
   * @returns SchemaVersion
   * @throws ApiError
   */
  public static apiWorksheetsEnhanceCreate(
    id: number,
    requestBody: SchemaVersion,
  ): CancelablePromise<SchemaVersion> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/worksheets/{id}/enhance',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Toggle between streaming and non-streaming responses based on query param `stream=true`.
   * @param requestBody
   * @returns SchemaVersion
   * @throws ApiError
   */
  public static apiWorksheetsGenerateCreate(
    requestBody: SchemaVersion,
  ): CancelablePromise<SchemaVersion> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/worksheets/generate',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
