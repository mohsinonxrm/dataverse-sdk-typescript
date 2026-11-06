/**
 * msdyn_forecastpredictionstatus entity type
 */
export interface msdyn_forecastpredictionstatus {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_forecastconfigurationid_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_errorcode?: string;
  msdyn_errordetails?: string;
  msdyn_failurecount?: number;
  msdyn_forecastpredictionstatusid?: string;
  msdyn_nextscheduledtime?: string;
  msdyn_orchestrationstage?: number;
  msdyn_orchestrationstate?: number;
  msdyn_outputgenerationdate?: string;
  msdyn_predictionon?: string;
  msdyn_predictionstatus?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
