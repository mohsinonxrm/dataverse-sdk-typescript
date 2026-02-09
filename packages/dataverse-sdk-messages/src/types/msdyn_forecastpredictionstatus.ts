/**
 * msdyn_forecastpredictionstatus entity type
 */
export interface msdyn_forecastpredictionstatus {
  statuscode: number;
  msdyn_orchestrationstate: number;
  msdyn_nextscheduledtime: string;
  createdon: string;
  importsequencenumber: number;
  _modifiedby_value: string;
  _modifiedonbehalfby_value: string;
  _msdyn_forecastconfigurationid_value: string;
  msdyn_predictionon: string;
  msdyn_outputgenerationdate: string;
  modifiedon: string;
  timezoneruleversionnumber: number;
  statecode: number;
  overriddencreatedon: string;
  msdyn_errorcode: string;
  msdyn_failurecount: number;
  utcconversiontimezonecode: number;
  _createdonbehalfby_value: string;
  _createdby_value: string;
  msdyn_orchestrationstage: number;
  _organizationid_value: string;
  versionnumber: number;
  msdyn_forecastpredictionstatusid: string;
  msdyn_predictionstatus: string;
  msdyn_errordetails: string;
}
