/**
 * audit entity type
 */
export interface audit {
  objecttypecode: string;
  _userid_value: string;
  useradditionalinfo: string;
  createdon: string;
  attributemask: string;
  auditid: string;
  versionnumber: number;
  changedata: string;
  _regardingobjectid_value: string;
  transactionid: string;
  additionalinfo: string;
  operation: number;
  action: number;
  _objectid_value: string;
  _callinguserid_value: string;
  timetoliveinseconds: number;
}
