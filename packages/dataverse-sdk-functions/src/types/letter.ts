import type { activitypointer } from './activitypointer.js';

/**
 * letter entity type
 */
export interface letter extends activitypointer {
  address?: string;
  category?: string;
  directioncode?: boolean;
  importsequencenumber?: number;
  overriddencreatedon?: string;
  subcategory?: string;
  subscriptionid?: string;
}
