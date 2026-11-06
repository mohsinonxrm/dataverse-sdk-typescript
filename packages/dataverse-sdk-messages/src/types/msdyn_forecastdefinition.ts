/**
 * msdyn_forecastdefinition entity type
 */
export interface msdyn_forecastdefinition {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_metricid_value?: string;
  _msdyn_rollupquery_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_fiscalmonth?: number;
  msdyn_fiscalquarter?: number;
  msdyn_fiscalyear?: number;
  msdyn_forecastdefinitionid?: string;
  msdyn_forecastdefinitionname?: string;
  msdyn_forecastperiodtype?: number;
  msdyn_numberofrecurrences?: number;
  msdyn_quotasource?: number;
  msdyn_validfrom?: unknown;
  msdyn_validto?: unknown;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
