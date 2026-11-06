/**
 * workflowlog entity type
 */
export interface workflowlog {
  _asyncoperationid_value?: string;
  _childworkflowinstanceid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _regardingobjectid_value?: string;
  activityname?: string;
  completedon?: string;
  createdon?: string;
  description?: string;
  duration?: number;
  errorcode?: number;
  errortext?: string;
  inputs?: string;
  inputs_name?: string;
  interactionactivityresult?: string;
  iterationcount?: number;
  message?: string;
  modifiedon?: string;
  outputs?: string;
  outputs_name?: string;
  repetitioncount?: number;
  repetitionid?: string;
  stagename?: string;
  startedon?: string;
  status?: number;
  stepname?: string;
  workflowlogid?: string;
}
