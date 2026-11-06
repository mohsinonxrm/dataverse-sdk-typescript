/**
 * agentprompt entity type
 */
export interface agentprompt {
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
  agentid?: string;
  agentpromptid?: string;
  basepromptid?: string;
  createdon?: string;
  experimentmetadata?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  parentpromptid?: string;
  partitionid?: string;
  prompttext?: string;
  prompttexthash?: string;
  status?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
