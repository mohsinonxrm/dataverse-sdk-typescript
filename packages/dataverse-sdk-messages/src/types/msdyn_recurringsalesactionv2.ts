/**
 * msdyn_recurringsalesactionv2 entity type
 */
export interface msdyn_recurringsalesactionv2 {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_customactionname?: string;
  msdyn_failurecount?: number;
  msdyn_featurename?: number;
  msdyn_isrecurrencepatternschedule?: boolean;
  msdyn_lastexecutioninfo?: string;
  msdyn_payload?: string;
  msdyn_recordstate?: number;
  msdyn_recurringsalesactionv2id?: string;
  msdyn_retrycount?: number;
  msdyn_schedule?: string;
  msdyn_startdate?: string;
  msdyn_triggername?: string;
  msdyn_workloadname?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
