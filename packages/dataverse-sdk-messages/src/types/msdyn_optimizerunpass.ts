/**
 * msdyn_optimizerunpass entity type
 */
export interface msdyn_optimizerunpass {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_optimizepattern_value?: string;
  _msdyn_optimizerun_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_donecount?: number;
  msdyn_failedcount?: number;
  msdyn_failuremessage?: string;
  msdyn_granularity?: number;
  msdyn_heartbeat?: string;
  msdyn_name?: string;
  msdyn_optimizerunpassid?: string;
  msdyn_passindex?: number;
  msdyn_passname?: string;
  msdyn_passstatus?: number;
  msdyn_result?: string;
  msdyn_skillcontract?: string;
  msdyn_skillname?: string;
  msdyn_totalcount?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
