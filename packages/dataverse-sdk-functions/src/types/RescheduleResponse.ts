import type { BusinessNotification } from './BusinessNotification.js';
import type { ValidationResult } from './ValidationResult.js';

/**
 * RescheduleResponse complex type
 */
export interface RescheduleResponse {
  Notifications?: BusinessNotification[];
  ValidationResult?: ValidationResult;
}
