/**
 * msdyn_intentcoreevaluationjob entity type
 */
export interface msdyn_intentcoreevaluationjob {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_agentservicecontext?: string;
  msdyn_bjsjobid?: string;
  msdyn_filecontent?: string;
  msdyn_filecontent_name?: string;
  msdyn_filecontentid?: string;
  msdyn_insights?: string;
  msdyn_intentcoreevaluationjobid?: string;
  msdyn_jobresultfile?: string;
  msdyn_jobresultfile_name?: string;
  msdyn_jobstatus?: number;
  msdyn_name?: string;
  msdyn_organizationid?: string;
  msdyn_rowanalysis?: string;
  msdyn_runid?: string;
  msdyn_totalpass_group?: number;
  msdyn_totalpass_intent?: number;
  msdyn_totalpass_negative_group?: number;
  msdyn_totalpass_negative_intent?: number;
  msdyn_totalpass_positive_group?: number;
  msdyn_totalpass_positive_intent?: number;
  msdyn_totalrows?: number;
  msdyn_totalrows_positive_group?: number;
  msdyn_totalrows_positive_intent?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
