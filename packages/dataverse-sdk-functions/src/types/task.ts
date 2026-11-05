import type { activitypointer } from "./activitypointer.js";

/**
 * task entity type
 */
export interface task extends activitypointer {
  subscriptionid?: string;
  overriddencreatedon?: string;
  percentcomplete?: number;
  importsequencenumber?: number;
  crmtaskassigneduniqueid?: string;
  subcategory?: string;
  category?: string;
}
