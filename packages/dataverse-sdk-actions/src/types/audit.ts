/**
 * audit entity type
 */
export interface audit {
  _callinguserid_value?: string;
  _objectid_value?: string;
  _regardingobjectid_value?: string;
  _userid_value?: string;
  action?: number;
  additionalinfo?: string;
  attributemask?: string;
  auditid?: string;
  changedata?: string;
  createdon?: string;
  objecttypecode?: string;
  operation?: number;
  timetoliveinseconds?: number;
  transactionid?: string;
  useradditionalinfo?: string;
  versionnumber?: number;
}
