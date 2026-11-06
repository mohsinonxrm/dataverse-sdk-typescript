import type { activitypointer } from './activitypointer.js';

/**
 * opportunityclose entity type
 */
export interface opportunityclose extends activitypointer {
  _competitorid_value?: string;
  _opportunityid_value?: string;
  actualrevenue?: number;
  actualrevenue_base?: number;
  category?: string;
  importsequencenumber?: number;
  opportunitystatecode?: number;
  opportunitystatuscode?: number;
  overriddencreatedon?: string;
  subcategory?: string;
}
