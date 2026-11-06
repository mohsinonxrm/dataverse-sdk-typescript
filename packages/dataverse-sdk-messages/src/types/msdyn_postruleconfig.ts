/**
 * msdyn_postruleconfig entity type
 */
export interface msdyn_postruleconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_postconfigid_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_formatid?: string;
  msdyn_name?: string;
  msdyn_postruleconfigid?: string;
  msdyn_posttoyammer?: boolean;
  msdyn_ruleid?: string;
  msdyn_rulesource?: string;
  msdyn_stepid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
