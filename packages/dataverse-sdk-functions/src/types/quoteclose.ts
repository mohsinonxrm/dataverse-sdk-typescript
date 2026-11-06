import type { activitypointer } from './activitypointer.js';

/**
 * quoteclose entity type
 */
export interface quoteclose extends activitypointer {
  _quoteid_value?: string;
  category?: string;
  importsequencenumber?: number;
  overriddencreatedon?: string;
  quotenumber?: string;
  revision?: number;
  subcategory?: string;
}
