/**
 * msdyn_guardrail_execution_event entity type
 */
export interface msdyn_guardrail_execution_event {
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
  msdyn_attachmentfilename?: string;
  msdyn_attachmentid?: string;
  msdyn_detectionaction?: number;
  msdyn_error?: string;
  msdyn_feedback?: string;
  msdyn_guardrail_execution_eventid?: string;
  msdyn_guardrail_ruleid?: string;
  msdyn_guardrail_runid?: string;
  msdyn_guardrail_scenariotypeid?: string;
  msdyn_invokedby?: string;
  msdyn_issendemail?: boolean;
  msdyn_isviolated?: boolean;
  msdyn_name?: string;
  msdyn_objectid?: string;
  msdyn_reason?: string;
  msdyn_regardingid?: string;
  msdyn_regardingtype?: string;
  msdyn_score?: number;
  msdyn_shadowmode?: boolean;
  msdyn_version?: number;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
