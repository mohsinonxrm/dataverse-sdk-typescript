import type { BusinessNotification } from "./BusinessNotification.js";
import type { ValidationResult } from "./ValidationResult.js";

/**
 * RescheduleResponse
 */
export interface RescheduleResponse {
  Notifications?: BusinessNotification[];
  ValidationResult?: ValidationResult;
}
