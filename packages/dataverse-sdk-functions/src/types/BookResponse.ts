import type { BusinessNotification } from "./BusinessNotification.js";
import type { ValidationResult } from "./ValidationResult.js";

/**
 * BookResponse complex type
 */
export interface BookResponse {
  Notifications?: BusinessNotification[];
  ValidationResult?: ValidationResult;
}
