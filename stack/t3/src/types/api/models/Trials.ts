/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StatusEnum } from './StatusEnum';
import type { TrialPhaseEnum } from './TrialPhaseEnum';
export type Trials = {
  readonly id: number;
  readonly created_at: string;
  readonly modified_at: string;
  title: string;
  sample_size: number;
  study_design: string;
  study_duration: string;
  health_status: string;
  external_factors: string;
  age_range: string;
  bias?: string | null;
  bias_score?: number | null;
  blinding: boolean;
  status?: StatusEnum;
  trial_phase: TrialPhaseEnum;
  pros?: number | null;
  clinros?: number | null;
  performance_outcomes?: number | null;
  composite_score?: number | null;
  complexity_score?: number | null;
  success_rate?: string | null;
  author?: number | null;
  drug?: number | null;
  drug_effects?: Array<number>;
};

