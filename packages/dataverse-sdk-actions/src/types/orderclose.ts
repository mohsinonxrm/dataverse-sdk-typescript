import type { activitypointer } from "./activitypointer.js";

/**
 * orderclose entity type
 */
export interface orderclose extends activitypointer {
  _salesorderid_value?: string;
  category?: string;
  importsequencenumber?: number;
  ordernumber?: string;
  overriddencreatedon?: string;
  revision?: number;
  subcategory?: string;
}
