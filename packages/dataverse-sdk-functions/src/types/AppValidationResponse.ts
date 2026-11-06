import type { ValidationIssue } from './ValidationIssue.js';

/**
 * AppValidationResponse complex type
 */
export interface AppValidationResponse {
  ValidationIssueList?: ValidationIssue[];
  ValidationSuccess?: boolean;
}
