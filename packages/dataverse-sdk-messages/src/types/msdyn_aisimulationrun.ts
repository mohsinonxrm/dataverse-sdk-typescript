/**
 * msdyn_aisimulationrun entity type
 */
export interface msdyn_aisimulationrun {
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
  msdyn_aisimulationrunid?: string;
  msdyn_completedon?: string;
  msdyn_conditionexpressionxml?: string;
  msdyn_entitylogicalname?: string;
  msdyn_mode?: number;
  msdyn_name?: string;
  msdyn_recordids?: string;
  msdyn_simulationarea?: number;
  msdyn_simulationcriteria?: string;
  msdyn_simulationdatasource?: number;
  msdyn_simulationinputfile?: string;
  msdyn_simulationinputfile_name?: string;
  msdyn_simulationscenarios?: string;
  msdyn_startedon?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
