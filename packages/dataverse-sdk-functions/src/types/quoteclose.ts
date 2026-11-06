import type { activitypointer } from "./activitypointer.js";

/**
 * quoteclose entity type
 */
export interface quoteclose extends activitypointer {
  importsequencenumber?: number;
  quotenumber?: string;
  overriddencreatedon?: string;
  revision?: number;
  category?: string;
  subcategory?: string;
  _quoteid_value?: string;
}
