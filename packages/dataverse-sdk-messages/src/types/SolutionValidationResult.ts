import type { SolutionValidationResultType } from "./SolutionValidationResultType.js";

/**
 * SolutionValidationResult complex type
 */
export interface SolutionValidationResult {
  AdditionalInfo?: string;
  ErrorCode?: number;
  Message?: string;
  SolutionValidationResultType?: SolutionValidationResultType;
}
