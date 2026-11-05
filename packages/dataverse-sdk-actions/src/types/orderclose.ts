import type { activitypointer } from "./activitypointer.js";

/**
 * orderclose entity type
 */
export interface orderclose extends activitypointer {
  category?: string;
  subcategory?: string;
  importsequencenumber?: number;
  overriddencreatedon?: string;
  revision?: number;
  _salesorderid_value?: string;
  ordernumber?: string;
}
