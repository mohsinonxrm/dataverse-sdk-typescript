/**
 * msdyn_playbookactivity entity type
 */
export interface msdyn_playbookactivity {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_playbooktemplateid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_activityLogicalName?: string;
  msdyn_activityType?: number;
  msdyn_playbookactivity_json?: string;
  msdyn_playbookactivityid?: string;
  msdyn_subject?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
