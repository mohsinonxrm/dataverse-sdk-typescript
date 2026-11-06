/**
 * msdyn_aitestrunbatch entity type
 */
export interface msdyn_aitestrunbatch {
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
  msdyn_accuracyscore?: number;
  msdyn_aiobjectid?: string;
  msdyn_aiobjecttype?: string;
  msdyn_aitestrunbatchid?: string;
  msdyn_batchrunstatus?: number;
  msdyn_completedon?: string;
  msdyn_description?: string;
  msdyn_errormessage?: string;
  msdyn_lastreviewedon?: string;
  msdyn_name?: string;
  msdyn_runduration?: number;
  msdyn_startedon?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
