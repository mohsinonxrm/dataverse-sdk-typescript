import type { ValidationIssue } from "./ValidationIssue.js";

/**
 * AppValidationResponse complex type
 */
export interface AppValidationResponse {
  ValidationSuccess: boolean;
  ValidationIssueList: ValidationIssue[];
}
