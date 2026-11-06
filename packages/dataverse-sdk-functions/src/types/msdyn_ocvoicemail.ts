import type { activitypointer } from './activitypointer.js';

/**
 * msdyn_ocvoicemail entity type
 */
export interface msdyn_ocvoicemail extends activitypointer {
  _msdyn_customer_value?: string;
  _msdyn_missedconversationid_value?: string;
  importsequencenumber?: number;
  msdyn_hascontent?: boolean;
  msdyn_orgphonenumber?: string;
  msdyn_sourcephonenumber?: string;
  msdyn_voicemailpreview?: string;
  msdyn_voicemailtype?: number;
  overriddencreatedon?: string;
}
