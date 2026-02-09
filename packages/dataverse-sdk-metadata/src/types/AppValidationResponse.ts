import type { ValidationIssue } from "./ValidationIssue.js";

/**
 * AppValidationResponse
 */
export interface AppValidationResponse {
  ValidationSuccess?: boolean;
  ValidationIssueList?: ValidationIssue[];
}
