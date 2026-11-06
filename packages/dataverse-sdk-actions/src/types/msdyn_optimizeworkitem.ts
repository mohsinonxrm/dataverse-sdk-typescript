/**
 * msdyn_optimizeworkitem entity type
 */
export interface msdyn_optimizeworkitem {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_optimizerun_value?: string;
  _msdyn_optimizerunpass_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_attempts?: number;
  msdyn_claimtoken?: string;
  msdyn_failurecode?: string;
  msdyn_failuremessage?: string;
  msdyn_inputhash?: string;
  msdyn_lockexpiry?: string;
  msdyn_maxattempts?: number;
  msdyn_name?: string;
  msdyn_nextvisible?: string;
  msdyn_optimizeworkitemid?: string;
  msdyn_payloadref?: string;
  msdyn_regardingobjectid?: string;
  msdyn_regardingobjectname?: string;
  msdyn_result?: string;
  msdyn_workitemstatus?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
