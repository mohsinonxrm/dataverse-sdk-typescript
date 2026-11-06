/**
 * msdyn_forecastrecurrence entity type
 */
export interface msdyn_forecastrecurrence {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_forecastdefinitionid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_actualparticipatingrecordsfetchxml?: string;
  msdyn_failureinfo?: string;
  msdyn_forecastrecurrenceid?: string;
  msdyn_inprogressparticipatingrecordsfetchxml?: string;
  msdyn_ishierarchylocked?: boolean;
  msdyn_lastrecalculatedon?: string;
  msdyn_name?: string;
  msdyn_recalculatestatuschangedon?: string;
  msdyn_recalculationstarttime?: string;
  msdyn_recalculationstatus?: number;
  msdyn_recalculationstatusdescription?: string;
  msdyn_recurrenceindex?: number;
  msdyn_validfrom?: unknown;
  msdyn_validto?: unknown;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
