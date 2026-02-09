import type { SolutionValidationResultType } from "./SolutionValidationResultType.js";

/**
 * SolutionValidationResult
 */
export interface SolutionValidationResult {
  SolutionValidationResultType?: SolutionValidationResultType;
  Message?: string;
  ErrorCode?: number;
  AdditionalInfo?: string;
}
