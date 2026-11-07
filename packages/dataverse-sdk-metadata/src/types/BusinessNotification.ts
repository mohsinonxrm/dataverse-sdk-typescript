import type { BusinessNotificationParameter } from "./BusinessNotificationParameter.js";
import type { BusinessNotificationSeverity } from "./BusinessNotificationSeverity.js";

/**
 * BusinessNotification
 */
export interface BusinessNotification {
  Message?: string;
  Parameters?: BusinessNotificationParameter[];
  Severity?: BusinessNotificationSeverity;
}
