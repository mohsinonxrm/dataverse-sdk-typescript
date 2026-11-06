/**
 * msdyn_analysisresult entity type
 */
export interface msdyn_analysisresult {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_analysiscomponentid_value?: string;
  _msdyn_analysisjobid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_analysiscomponenttype?: number;
  msdyn_analysisresultid?: string;
  msdyn_category?: number;
  msdyn_componenttype?: number;
  msdyn_entityname?: string;
  msdyn_fileuri?: string;
  msdyn_hasresolution?: boolean;
  msdyn_helplink?: string;
  msdyn_level?: number;
  msdyn_line?: number;
  msdyn_member?: string;
  msdyn_message?: string;
  msdyn_messagearguments?: string;
  msdyn_messageid?: string;
  msdyn_module?: string;
  msdyn_name?: string;
  msdyn_repairissuetype?: string;
  msdyn_returnstatus?: number;
  msdyn_ruleid?: string;
  msdyn_rulereferenceuri?: string;
  msdyn_severity?: number;
  msdyn_snippet?: string;
  msdyn_solutionhealthmessage?: string;
  msdyn_type?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
