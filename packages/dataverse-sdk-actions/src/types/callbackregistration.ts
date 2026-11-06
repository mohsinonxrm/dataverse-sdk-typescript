/**
 * callbackregistration entity type
 */
export interface callbackregistration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  callbackregistrationid?: string;
  createdon?: string;
  entityname?: string;
  filterexpression?: string;
  filteringattributes?: string;
  harddelete?: boolean;
  logicappsversion?: string;
  message?: number;
  modifiedon?: string;
  name?: string;
  postponeuntil?: string;
  runas?: number;
  runtimeintegrationproperties?: string;
  scope?: number;
  sdkmessagename?: string;
  softdeletestatus?: number;
  url?: string;
  version?: number;
  versionnumber?: number;
}
