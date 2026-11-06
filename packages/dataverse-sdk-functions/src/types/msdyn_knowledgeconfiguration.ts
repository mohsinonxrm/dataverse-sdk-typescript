/**
 * msdyn_knowledgeconfiguration entity type
 */
export interface msdyn_knowledgeconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_datatype?: number;
  msdyn_groupname?: number;
  msdyn_knowledgeconfigurationid?: string;
  msdyn_settingname?: string;
  msdyn_settingvalue?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
