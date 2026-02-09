import type { BusinessNotification } from "./BusinessNotification.js";
import type { ValidationResult } from "./ValidationResult.js";

/**
 * ImmediateBookResponse
 */
export interface ImmediateBookResponse {
  ValidationResult?: ValidationResult;
  Notifications?: BusinessNotification[];
}
