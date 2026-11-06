/**
 * activitymonitor entity type
 */
export interface activitymonitor {
  _conditionid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _monitoredactivityitemid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _queueid_value?: string;
  _ruleid_value?: string;
  activitymonitorid?: string;
  advancedsettings?: string;
  contactcreatedbyrule?: boolean;
  createdon?: string;
  currentstate?: number;
  entitlementcheck?: boolean;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  reason?: number;
  recommendation?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
