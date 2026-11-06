import type { activitypointer } from './activitypointer.js';

/**
 * serviceappointment entity type
 */
export interface serviceappointment extends activitypointer {
  _msdyn_organizationalunitid_value?: string;
  _siteid_value?: string;
  category?: string;
  importsequencenumber?: number;
  isalldayevent?: boolean;
  location?: string;
  overriddencreatedon?: string;
  subcategory?: string;
  subscriptionid?: string;
}
