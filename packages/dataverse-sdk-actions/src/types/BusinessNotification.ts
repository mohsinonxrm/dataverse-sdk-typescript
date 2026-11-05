import type { BusinessNotificationParameter } from "./BusinessNotificationParameter.js";
import type { BusinessNotificationSeverity } from "./BusinessNotificationSeverity.js";

/**
 * BusinessNotification complex type
 */
export interface BusinessNotification {
  Severity?: BusinessNotificationSeverity;
  Message?: string;
  Parameters?: BusinessNotificationParameter[];
}
