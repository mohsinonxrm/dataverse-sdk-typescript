import type { BusinessNotification } from "./BusinessNotification.js";
import type { ValidationResult } from "./ValidationResult.js";

/**
 * BookResponse
 */
export interface BookResponse {
  Notifications?: BusinessNotification[];
  ValidationResult?: ValidationResult;
}
