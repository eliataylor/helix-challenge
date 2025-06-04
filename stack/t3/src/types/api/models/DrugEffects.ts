/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SeverityEnum } from './SeverityEnum';
export type DrugEffects = {
  readonly id: number;
  readonly created_at: string;
  readonly modified_at: string;
  severity: SeverityEnum;
  reported_count?: number;
  author?: number | null;
  side_effect?: number | null;
};

