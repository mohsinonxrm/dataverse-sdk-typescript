import type { activitypointer } from "./activitypointer.js";

/**
 * fax entity type
 */
export interface fax extends activitypointer {
  subscriptionid?: string;
  numberofpages?: number;
  billingcode?: string;
  coverpagename?: string;
  importsequencenumber?: number;
  subcategory?: string;
  overriddencreatedon?: string;
  faxnumber?: string;
  directioncode?: boolean;
  tsid?: string;
  category?: string;
}
