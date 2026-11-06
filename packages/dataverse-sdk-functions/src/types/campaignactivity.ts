import type { activitypointer } from './activitypointer.js';

/**
 * campaignactivity entity type
 */
export interface campaignactivity extends activitypointer {
  actualcost?: number;
  actualcost_base?: number;
  budgetedcost?: number;
  budgetedcost_base?: number;
  category?: string;
  channeltypecode?: number;
  donotsendonoptout?: boolean;
  excludeifcontactedinxdays?: number;
  ignoreinactivelistmembers?: boolean;
  importsequencenumber?: number;
  overriddencreatedon?: string;
  subcategory?: string;
  typecode?: number;
}
