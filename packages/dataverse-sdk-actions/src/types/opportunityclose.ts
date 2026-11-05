import type { activitypointer } from "./activitypointer.js";

/**
 * opportunityclose entity type
 */
export interface opportunityclose extends activitypointer {
  importsequencenumber?: number;
  _opportunityid_value?: string;
  subcategory?: string;
  _competitorid_value?: string;
  actualrevenue?: number;
  category?: string;
  actualrevenue_base?: number;
  opportunitystatecode?: number;
  overriddencreatedon?: string;
  opportunitystatuscode?: number;
}
