/**
 * msdyn_evaluationsimulationrun entity type
 */
export interface msdyn_evaluationsimulationrun {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_evaluationcriteriaversionid_value?: string;
  _msdyn_regardingobjectid_value?: string;
  _msdyn_simulationrunid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_errordetails?: string;
  msdyn_evaluationcriteriaparentversion?: number;
  msdyn_evaluationcriteriaversion?: number;
  msdyn_evaluationsimulationrunid?: string;
  msdyn_name?: string;
  msdyn_recordtype?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
