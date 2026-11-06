import type { activitypointer } from "./activitypointer.js";

/**
 * phonecall entity type
 */
export interface phonecall extends activitypointer {
  subcategory?: string;
  category?: string;
  overriddencreatedon?: string;
  subscriptionid?: string;
  phonenumber?: string;
  directioncode?: boolean;
  importsequencenumber?: number;
}
