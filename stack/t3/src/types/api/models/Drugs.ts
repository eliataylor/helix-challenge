/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApprovalStatusEnum } from './ApprovalStatusEnum';
export type Drugs = {
  readonly id: number;
  readonly created_at: string;
  readonly modified_at: string;
  name: string;
  description?: string | null;
  approval_status?: ApprovalStatusEnum;
  target_cost?: number | null;
  full_treatment_duration?: string | null;
  author?: number | null;
  manufacturer?: number | null;
  drug_effects?: Array<number | null>;
};

