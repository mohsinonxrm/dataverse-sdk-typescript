/**
 * msdyn_forecastconfiguration entity type
 */
export interface msdyn_forecastconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_addedweekindex?: number;
  msdyn_additionalfilter?: string;
  msdyn_advancedsettings?: string;
  msdyn_calendartemplate?: number;
  msdyn_columns?: string;
  msdyn_enddate?: string;
  msdyn_entitymetadata?: string;
  msdyn_errormessage?: string;
  msdyn_fiscalyearstartdate?: string;
  msdyn_forecastcategoryattribute?: string;
  msdyn_forecastconfigurationid?: string;
  msdyn_forecasttimezone?: string;
  msdyn_hierarchyentity?: string;
  msdyn_hierarchyfilter?: string;
  msdyn_hierarchyrelationship?: string;
  msdyn_isdefault?: boolean;
  msdyn_issnapshotscheduled?: boolean;
  msdyn_moneyattrcache?: string;
  msdyn_name?: string;
  msdyn_numberofrecurrences?: number;
  msdyn_periodtype?: number;
  msdyn_permissionsdata?: string;
  msdyn_pivots?: string;
  msdyn_previewflags?: string;
  msdyn_publisheddatetime?: string;
  msdyn_relatedentities?: string;
  msdyn_rollupdefaultviewid?: string;
  msdyn_rollupentity?: string;
  msdyn_rootentityrecordid?: string;
  msdyn_snapshotschedule?: string;
  msdyn_startdate?: string;
  msdyn_startingfiscalmonth?: number;
  msdyn_startingfiscalquarter?: number;
  msdyn_startingfiscalyear?: number;
  msdyn_templatetype?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
