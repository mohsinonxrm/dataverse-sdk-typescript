/**
 * msdyn_aisimulationresult entity type
 */
export interface msdyn_aisimulationresult {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_aisimulationrunid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_aisimulationresultid?: string;
  msdyn_errordetails?: string;
  msdyn_inputdata?: string;
  msdyn_intentfamily?: string;
  msdyn_name?: string;
  msdyn_regardingentitylogicalname?: string;
  msdyn_regardingobjectid?: string;
  msdyn_simulationcriteria?: string;
  msdyn_simulationresultdetail?: string;
  msdyn_simulationscenario?: number;
  msdyn_simulationstatus?: number;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
