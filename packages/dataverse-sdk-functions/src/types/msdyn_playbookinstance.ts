/**
 * msdyn_playbookinstance entity type
 */
export interface msdyn_playbookinstance {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_categoryid_value?: string;
  _msdyn_playbooktemplateid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _regarding_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_activitiesassociated?: number;
  msdyn_activitiesclosed?: number;
  msdyn_estimatedclose?: string;
  msdyn_evaluateactivityclosure?: boolean;
  msdyn_name?: string;
  msdyn_playbookinstanceid?: string;
  msdyn_trackprogress?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
