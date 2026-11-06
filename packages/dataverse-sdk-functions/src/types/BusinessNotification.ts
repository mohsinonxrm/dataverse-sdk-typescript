import type { BusinessNotificationParameter } from './BusinessNotificationParameter.js';
import type { BusinessNotificationSeverity } from './BusinessNotificationSeverity.js';

/**
 * BusinessNotification complex type
 */
export interface BusinessNotification {
  Message?: string;
  Parameters?: BusinessNotificationParameter[];
  Severity?: BusinessNotificationSeverity;
}
