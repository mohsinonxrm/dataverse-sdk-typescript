/**
 * msdyn_ocsitrainingdata entity type
 */
export interface msdyn_ocsitrainingdata {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_approvedby_value?: string;
  _msdyn_ocsitdimportconfigid_value?: string;
  _msdyn_ocskillidentmlmodelid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_approvedon?: string;
  msdyn_name?: string;
  msdyn_ocsitrainingdataid?: string;
  msdyn_ocsitrainingdatastatus?: number;
  msdyn_phrase?: string;
  msdyn_skillidscsv?: string;
  msdyn_skillscsv?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
