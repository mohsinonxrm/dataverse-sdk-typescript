/**
 * msdyn_predictioncomputationoperation entity type
 */
export interface msdyn_predictioncomputationoperation {
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
  msdyn_computationtriggerid?: string;
  msdyn_created?: string;
  msdyn_dockerimagename?: string;
  msdyn_expirydatetime?: string;
  msdyn_explanationpath?: string;
  msdyn_finished?: boolean;
  msdyn_islandurl?: string;
  msdyn_jobid?: string;
  msdyn_modelid?: string;
  msdyn_modelpath?: string;
  msdyn_name?: string;
  msdyn_operationguid?: string;
  msdyn_operationid?: string;
  msdyn_predictioncomputationoperationid?: string;
  msdyn_predictionguid?: string;
  msdyn_predictionname?: string;
  msdyn_resultpath?: string;
  msdyn_retrycounter?: number;
  msdyn_state?: string;
  msdyn_timespentcrmsyncsijobid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
