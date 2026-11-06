/**
 * msdyn_intentcontexthistory entity type
 */
export interface msdyn_intentcontexthistory {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_relatedrecordid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_agentactivitytype?: number;
  msdyn_agenttype?: number;
  msdyn_correlationid?: string;
  msdyn_intentcontext?: string;
  msdyn_intentcontexthistoryid?: string;
  msdyn_lastprocessedtimestamp?: string;
  msdyn_name?: string;
  msdyn_relatedrecordentitylogicalname?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
