/**
 * msdyn_authentication_activity entity type
 */
export interface msdyn_authentication_activity {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_authenticationprofileid_value?: string;
  _msdyn_authenticationsettingsid_value?: string;
  _msdyn_liveworkitemid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_activitydetails?: string;
  msdyn_activityresult?: string;
  msdyn_activityresultreason?: string;
  msdyn_activitytime?: string;
  msdyn_activitytype?: string;
  msdyn_additionalparameters?: string;
  msdyn_authentication_activityid?: string;
  msdyn_authenticationantifraudprofilename?: string;
  msdyn_primarycolumn?: string;
  msdyn_profilekey?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
