import type { activitypointer } from "./activitypointer.js";

/**
 * serviceappointment entity type
 */
export interface serviceappointment extends activitypointer {
  isalldayevent?: boolean;
  _msdyn_organizationalunitid_value?: string;
  location?: string;
  importsequencenumber?: number;
  subscriptionid?: string;
  _siteid_value?: string;
  subcategory?: string;
  overriddencreatedon?: string;
  category?: string;
}
