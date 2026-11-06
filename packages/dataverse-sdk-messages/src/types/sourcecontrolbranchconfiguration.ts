/**
 * sourcecontrolbranchconfiguration entity type
 */
export interface sourcecontrolbranchconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _sourcecontrolconfigurationid_value?: string;
  branchname?: string;
  branchsyncedcommitid?: string;
  branchsyncedtime?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  rootfolderpath?: string;
  sourcecontrolbranchconfigurationid?: string;
  sourcecontrolconfigurationidpid?: string;
  statuscode?: number;
  ttlinseconds?: number;
  upstreambranchname?: string;
  upstreambranchsyncedcommitid?: string;
  upstreambranchsyncedtime?: string;
  versionnumber?: number;
}
