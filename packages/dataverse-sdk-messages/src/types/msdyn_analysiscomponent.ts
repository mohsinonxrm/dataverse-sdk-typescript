/**
 * msdyn_analysiscomponent entity type
 */
export interface msdyn_analysiscomponent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_analysisjobid_value?: string;
  _msdyn_solutionhealthrulesetid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_analysiscomponentid?: string;
  msdyn_analysiscomponenttype?: number;
  msdyn_componentid?: string;
  msdyn_componentname?: string;
  msdyn_componenttype?: number;
  msdyn_componentversion?: string;
  msdyn_errorcount?: number;
  msdyn_name?: string;
  msdyn_retrycount?: number;
  msdyn_rulefailcount?: number;
  msdyn_rulepasscount?: number;
  msdyn_rulepassrate?: number;
  msdyn_sevcriticalcount?: number;
  msdyn_sevhighcount?: number;
  msdyn_sevlowcount?: number;
  msdyn_sevmediumcount?: number;
  msdyn_suggestioncount?: number;
  msdyn_warningcount?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
