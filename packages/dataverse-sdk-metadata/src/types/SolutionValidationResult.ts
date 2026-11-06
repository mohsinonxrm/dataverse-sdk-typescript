import type { SolutionValidationResultType } from "./SolutionValidationResultType.js";

/**
 * SolutionValidationResult
 */
export interface SolutionValidationResult {
  AdditionalInfo?: string;
  ErrorCode?: number;
  Message?: string;
  SolutionValidationResultType?: SolutionValidationResultType;
}
