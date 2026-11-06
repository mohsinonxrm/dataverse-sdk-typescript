import type { activitypointer } from './activitypointer.js';

/**
 * phonecall entity type
 */
export interface phonecall extends activitypointer {
  category?: string;
  directioncode?: boolean;
  importsequencenumber?: number;
  overriddencreatedon?: string;
  phonenumber?: string;
  subcategory?: string;
  subscriptionid?: string;
}
