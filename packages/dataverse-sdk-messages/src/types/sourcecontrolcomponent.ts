/**
 * sourcecontrolcomponent entity type
 */
export interface sourcecontrolcomponent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _sourcecontrolcomponentpayloadid_value?: string;
  action?: number;
  componentdisplayname?: string;
  componentid?: string;
  componentpath?: string;
  componenttype?: number;
  componenttypename?: string;
  createdon?: string;
  importsequencenumber?: number;
  iscommitted?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  solutioncomponentstate?: number;
  sourcecontrolcomponentid?: string;
  sourcecontrolcomponentpayloadidpid?: string;
  ttlinseconds?: number;
  useraction?: number;
  versionnumber?: number;
}
