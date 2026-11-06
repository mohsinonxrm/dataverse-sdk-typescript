/**
 * msdyn_optimizerun entity type
 */
export interface msdyn_optimizerun {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_cancellationrequestedby_value?: string;
  _msdyn_optimizeentityconfig_value?: string;
  _msdyn_optimizesegment_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_cancellationrequested?: boolean;
  msdyn_cancellationrequestedon?: string;
  msdyn_completedon?: string;
  msdyn_coordinatorfailurecount?: number;
  msdyn_failurecode?: string;
  msdyn_failuremessage?: string;
  msdyn_heartbeat?: string;
  msdyn_name?: string;
  msdyn_optimizerunid?: string;
  msdyn_runstatus?: number;
  msdyn_snapshot?: string;
  msdyn_snapshothash?: string;
  msdyn_startedon?: string;
  msdyn_totalrecordcount?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
