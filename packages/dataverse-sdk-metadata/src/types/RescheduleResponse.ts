import type { BusinessNotification } from "./BusinessNotification.js";
import type { ValidationResult } from "./ValidationResult.js";

/**
 * RescheduleResponse
 */
export interface RescheduleResponse {
  ValidationResult?: ValidationResult;
  Notifications?: BusinessNotification[];
}
