import type { activitypointer } from "./activitypointer.js";

/**
 * letter entity type
 */
export interface letter extends activitypointer {
  category?: string;
  directioncode?: boolean;
  overriddencreatedon?: string;
  subscriptionid?: string;
  subcategory?: string;
  address?: string;
  importsequencenumber?: number;
}
