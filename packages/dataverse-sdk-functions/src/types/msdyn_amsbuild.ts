/**
 * msdyn_amsbuild entity type
 */
export interface msdyn_amsbuild {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_modelid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_amsbuildid?: string;
  msdyn_autopurgeonfailure?: boolean;
  msdyn_buildcompletiondatetime?: string;
  msdyn_buildid?: string;
  msdyn_buildname?: string;
  msdyn_buildstatus?: number;
  msdyn_metadata?: string;
  msdyn_settings?: string;
  msdyn_trainedbuildcontentitems?: string;
  msdyn_trainingdatacontentitems?: string;
  msdyn_trainingenginesettings?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
