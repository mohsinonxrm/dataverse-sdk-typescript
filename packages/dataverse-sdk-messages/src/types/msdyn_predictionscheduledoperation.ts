/**
 * msdyn_predictionscheduledoperation entity type
 */
export interface msdyn_predictionscheduledoperation {
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
  msdyn_additionaldetails?: string;
  msdyn_created?: string;
  msdyn_name?: string;
  msdyn_nextscheduledtime?: string;
  msdyn_operationconfig?: string;
  msdyn_operationid?: string;
  msdyn_operationtype?: string;
  msdyn_predictionscheduledoperationid?: string;
  msdyn_regardingobjectid?: string;
  msdyn_retrycounter?: number;
  msdyn_scheduledintervalinminutes?: number;
  msdyn_schedulingcount?: number;
  msdyn_status?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
