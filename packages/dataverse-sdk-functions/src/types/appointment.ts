import type { activitypointer } from './activitypointer.js';

/**
 * appointment entity type
 */
export interface appointment extends activitypointer {
  attachmenterrors?: number;
  category?: string;
  globalobjectid?: string;
  importsequencenumber?: number;
  isalldayevent?: boolean;
  isdraft?: boolean;
  isonlinemeeting?: boolean;
  isunsafe?: number;
  location?: string;
  modifiedfieldsmask?: string;
  msdyn_associatedagentname?: string;
  onlinemeetingchatid?: string;
  onlinemeetingid?: string;
  onlinemeetingjoinurl?: string;
  onlinemeetingtype?: number;
  originalstartdate?: string;
  outlookownerapptid?: number;
  overriddencreatedon?: string;
  subcategory?: string;
  subscriptionid?: string;
}
