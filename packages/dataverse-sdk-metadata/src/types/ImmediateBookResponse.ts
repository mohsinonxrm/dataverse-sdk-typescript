import type { BusinessNotification } from "./BusinessNotification.js";
import type { ValidationResult } from "./ValidationResult.js";

/**
 * ImmediateBookResponse
 */
export interface ImmediateBookResponse {
  Notifications?: BusinessNotification[];
  ValidationResult?: ValidationResult;
}
