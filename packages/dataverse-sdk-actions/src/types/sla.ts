/**
 * sla entity type
 */
export interface sla {
  _businesshoursid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _transactioncurrencyid_value?: string;
  _workflowid_value?: string;
  allowpauseresume?: boolean;
  applicablefrom?: string;
  applicablefrompicklist?: number;
  changedattributelist?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  exchangerate?: number;
  isdefault?: boolean;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  objecttypecode?: number;
  overwritetime?: string;
  primaryentityotc?: number;
  slaid?: string;
  slaidunique?: string;
  slatype?: number;
  slaversion?: number;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  versionnumber?: number;
}
