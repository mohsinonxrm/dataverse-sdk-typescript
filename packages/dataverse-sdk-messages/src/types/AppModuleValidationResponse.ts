import type { ValidationIssue } from "./ValidationIssue.js";

/**
 * AppModuleValidationResponse complex type
 */
export interface AppModuleValidationResponse {
  CanBeActivated?: boolean;
  ValidationIssueList?: ValidationIssue[];
}
