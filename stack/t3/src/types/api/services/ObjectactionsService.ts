/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PhoneNumber } from '../models/PhoneNumber';
import type { VerifyPhone } from '../models/VerifyPhone';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ObjectactionsService {
  /**
   * @param requestBody
   * @returns any SMS sent successfully
   * @throws ApiError
   */
  public static objectactionsAuthSmsCreate(
    requestBody: PhoneNumber,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/objectactions/auth/sms',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
  /**
   * @param requestBody
   * @returns any SMS sent successfully
   * @throws ApiError
   */
  public static objectactionsAuthVerifySmsCreate(
    requestBody: VerifyPhone,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/objectactions/auth/verify-sms',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Bad request`,
      },
    });
  }
}
