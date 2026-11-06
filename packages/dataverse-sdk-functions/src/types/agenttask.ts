/**
 * agenttask entity type
 */
export interface agenttask {
  _agentfeeditemid_value?: string;
  _agenticscenario_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  agenticscenariopid?: string;
  agenttaskid?: string;
  assignedto?: string;
  context?: string;
  createdon?: string;
  data?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  priority?: string;
  requestedby?: string;
  state?: string;
  title?: string;
  ttlinseconds?: number;
  type?: string;
  versionnumber?: number;
}
