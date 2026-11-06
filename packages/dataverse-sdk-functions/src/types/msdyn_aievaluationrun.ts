/**
 * msdyn_aievaluationrun entity type
 */
export interface msdyn_aievaluationrun {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_aievaluationconfigurationid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_additionalresponsemetadata?: string;
  msdyn_aievaluationrunid?: string;
  msdyn_airunobjectid?: string;
  msdyn_airunobjecttype?: string;
  msdyn_comment?: string;
  msdyn_completedon?: string;
  msdyn_errormessage?: string;
  msdyn_evaluationresult?: string;
  msdyn_name?: string;
  msdyn_runduration?: number;
  msdyn_runstatus?: number;
  msdyn_startedon?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
