/**
 * msdyn_ocsitdimportconfig entity type
 */
export interface msdyn_ocsitdimportconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_ocskillidentmlmodelid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_cdsdataloadconfig?: string;
  msdyn_importconfigtype?: number;
  msdyn_loadstatus?: number;
  msdyn_name?: string;
  msdyn_ocsitdimportconfigid?: string;
  msdyn_recordsimported?: number;
  msdyn_recordsskipped?: number;
  msdyn_totalrecordstoimport?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
