import type { activitypointer } from "./activitypointer.js";

/**
 * task entity type
 */
export interface task extends activitypointer {
  category?: string;
  crmtaskassigneduniqueid?: string;
  importsequencenumber?: number;
  overriddencreatedon?: string;
  percentcomplete?: number;
  subcategory?: string;
  subscriptionid?: string;
}
