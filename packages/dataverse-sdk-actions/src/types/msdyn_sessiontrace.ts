/**
 * msdyn_sessiontrace entity type
 */
export interface msdyn_sessiontrace {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_executionid?: string;
  msdyn_payload?: string;
  msdyn_payload_name?: string;
  msdyn_sessionid?: string;
  msdyn_sessiontraceid?: string;
  msdyn_sessiontracename?: string;
  msdyn_skillname?: string;
  msdyn_skillversion?: string;
  msdyn_skippedreason?: string;
  msdyn_status?: number;
  msdyn_userid?: string;
  msdyn_userinstruction?: string;
  msdyn_workspaceid?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
