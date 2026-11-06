import type { activitypointer } from "./activitypointer.js";

/**
 * campaignresponse entity type
 */
export interface campaignresponse extends activitypointer {
  firstname?: string;
  yomicompanyname?: string;
  yomifirstname?: string;
  emailaddress?: string;
  responsecode?: number;
  yomilastname?: string;
  importsequencenumber?: number;
  receivedon?: string;
  category?: string;
  companyname?: string;
  telephone?: string;
  _originatingactivityid_value?: string;
  fax?: string;
  lastname?: string;
  promotioncodename?: string;
  channeltypecode?: number;
  overriddencreatedon?: string;
  subcategory?: string;
}
