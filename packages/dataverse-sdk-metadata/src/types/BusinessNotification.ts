import type { BusinessNotificationParameter } from "./BusinessNotificationParameter.js";
import type { BusinessNotificationSeverity } from "./BusinessNotificationSeverity.js";

/**
 * BusinessNotification
 */
export interface BusinessNotification {
  Severity?: BusinessNotificationSeverity;
  Message?: string;
  Parameters?: BusinessNotificationParameter[];
}
