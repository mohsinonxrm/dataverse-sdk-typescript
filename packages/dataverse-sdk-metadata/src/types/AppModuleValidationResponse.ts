import type { ValidationIssue } from "./ValidationIssue.js";

/**
 * AppModuleValidationResponse
 */
export interface AppModuleValidationResponse {
  CanBeActivated?: boolean;
  ValidationIssueList?: ValidationIssue[];
}
