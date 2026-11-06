/**
 * msdyn_historicalqea entity type
 */
export interface msdyn_historicalqea {
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
  msdyn_historicalqeaid?: string;
  msdyn_issimulated?: boolean;
  msdyn_jobid?: string;
  msdyn_name?: string;
  msdyn_overallqeascore?: number;
  msdyn_ruleconfig?: string;
  msdyn_simulationrunid?: string;
  msdyn_sourceliveworkstreamid?: string;
  msdyn_status?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
