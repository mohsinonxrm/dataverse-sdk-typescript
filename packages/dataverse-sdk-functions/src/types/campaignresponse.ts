import type { activitypointer } from './activitypointer.js';

/**
 * campaignresponse entity type
 */
export interface campaignresponse extends activitypointer {
  _originatingactivityid_value?: string;
  category?: string;
  channeltypecode?: number;
  companyname?: string;
  emailaddress?: string;
  fax?: string;
  firstname?: string;
  importsequencenumber?: number;
  lastname?: string;
  overriddencreatedon?: string;
  promotioncodename?: string;
  receivedon?: string;
  responsecode?: number;
  subcategory?: string;
  telephone?: string;
  yomicompanyname?: string;
  yomifirstname?: string;
  yomilastname?: string;
}
