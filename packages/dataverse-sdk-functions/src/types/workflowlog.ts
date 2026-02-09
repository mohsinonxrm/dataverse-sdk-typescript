/**
 * workflowlog entity type
 */
export interface workflowlog {
  stepname: string;
  _childworkflowinstanceid_value: string;
  _ownerid_value: string;
  message: string;
  activityname: string;
  _owningbusinessunit_value: string;
  interactionactivityresult: string;
  _owninguser_value: string;
  outputs: string;
  duration: number;
  iterationcount: number;
  outputs_name: string;
  workflowlogid: string;
  repetitioncount: number;
  stagename: string;
  _modifiedby_value: string;
  _createdonbehalfby_value: string;
  status: number;
  _modifiedonbehalfby_value: string;
  inputs_name: string;
  _createdby_value: string;
  description: string;
  inputs: string;
  errortext: string;
  _regardingobjectid_value: string;
  modifiedon: string;
  _owningteam_value: string;
  startedon: string;
  createdon: string;
  completedon: string;
  _asyncoperationid_value: string;
  errorcode: number;
  repetitionid: string;
}
