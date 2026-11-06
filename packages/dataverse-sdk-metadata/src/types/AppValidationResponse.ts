import type { ValidationIssue } from "./ValidationIssue.js";

/**
 * AppValidationResponse
 */
export interface AppValidationResponse {
  ValidationIssueList?: ValidationIssue[];
  ValidationSuccess?: boolean;
}
