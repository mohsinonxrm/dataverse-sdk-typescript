/**
 * msdyn_optimizegovernor entity type
 */
export interface msdyn_optimizegovernor {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_activerun_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_governorkey?: string;
  msdyn_killswitch?: boolean;
  msdyn_leaseexpiry?: string;
  msdyn_leaseowner?: string;
  msdyn_maxbatchsize?: number;
  msdyn_maxconcurrency?: number;
  msdyn_name?: string;
  msdyn_optimizegovernorid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
