import type { activitypointer } from './activitypointer.js';

/**
 * fax entity type
 */
export interface fax extends activitypointer {
  billingcode?: string;
  category?: string;
  coverpagename?: string;
  directioncode?: boolean;
  faxnumber?: string;
  importsequencenumber?: number;
  numberofpages?: number;
  overriddencreatedon?: string;
  subcategory?: string;
  subscriptionid?: string;
  tsid?: string;
}
