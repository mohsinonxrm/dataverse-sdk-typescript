import type { SolutionValidationResultType } from "./SolutionValidationResultType.js";

/**
 * SolutionValidationResult complex type
 */
export interface SolutionValidationResult {
  SolutionValidationResultType: SolutionValidationResultType;
  Message: string;
  ErrorCode: number;
  AdditionalInfo: string;
}
