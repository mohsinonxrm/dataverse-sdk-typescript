/**
 * msdyn_evaluation entity type
 */
export interface msdyn_evaluation {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_evaluationcriteria_value?: string;
  _msdyn_evaluationextension_value?: string;
  _msdyn_evaluationplan_value?: string;
  _msdyn_evaluationplanrun_value?: string;
  _msdyn_regardingobjectid_value?: string;
  _msdyn_regardingobjectowner_value?: string;
  _msdyn_requestedby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_additionaldetails?: string;
  msdyn_agentenddate?: string;
  msdyn_agentresponsejson?: string;
  msdyn_createtype?: number;
  msdyn_criticalquestionstatus?: number;
  msdyn_errorcode?: number;
  msdyn_errordetails?: string;
  msdyn_evaluationcriteriaparentversion?: number;
  msdyn_evaluationcriteriaversion?: number;
  msdyn_evaluationextensionpid?: string;
  msdyn_evaluationid?: string;
  msdyn_evaluationmethod?: number;
  msdyn_evaluatorcompletiondate?: string;
  msdyn_evaluatorduedate?: string;
  msdyn_isevaluationedited?: boolean;
  msdyn_knowledgearticlejson?: string;
  msdyn_lastsummarygeneratedon?: string;
  msdyn_name?: string;
  msdyn_participantscope?: number;
  msdyn_previousqualityagentstatus?: number;
  msdyn_previousstatuscode?: number;
  msdyn_qualityagentstatus?: number;
  msdyn_relatedrecordtype?: number;
  msdyn_responsejson?: string;
  msdyn_retrycount?: number;
  msdyn_score?: number;
  msdyn_scorejson?: string;
  msdyn_scoringenabledoncreation?: number;
  msdyn_summarygenerationstatus?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
