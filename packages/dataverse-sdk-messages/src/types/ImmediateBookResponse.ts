import type { BusinessNotification } from "./BusinessNotification.js";
import type { ValidationResult } from "./ValidationResult.js";

/**
 * ImmediateBookResponse complex type
 */
export interface ImmediateBookResponse {
  Notifications?: BusinessNotification[];
  ValidationResult?: ValidationResult;
}
