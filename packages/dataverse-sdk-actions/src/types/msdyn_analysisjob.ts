/**
 * msdyn_analysisjob entity type
 */
export interface msdyn_analysisjob {
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
  msdyn_analysisjobid?: string;
  msdyn_analysisjobsreport?: string;
  msdyn_analysisjobsreport_name?: string;
  msdyn_customdetails?: string;
  msdyn_displaystatus?: string;
  msdyn_endtime?: string;
  msdyn_errorcount?: number;
  msdyn_exception?: string;
  msdyn_inappnotificationenabled?: boolean;
  msdyn_name?: string;
  msdyn_rulefailcount?: number;
  msdyn_rulepasscount?: number;
  msdyn_ruleruncount?: number;
  msdyn_runcorrelationid?: string;
  msdyn_sevcriticalcount?: number;
  msdyn_sevhighcount?: number;
  msdyn_sevlowcount?: number;
  msdyn_sevmediumcount?: number;
  msdyn_starttime?: string;
  msdyn_suggestioncount?: number;
  msdyn_tenantid?: string;
  msdyn_triggertype?: string;
  msdyn_warningcount?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
