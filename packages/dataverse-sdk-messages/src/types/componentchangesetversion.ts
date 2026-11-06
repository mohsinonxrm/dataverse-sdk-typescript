/**
 * componentchangesetversion entity type
 */
export interface componentchangesetversion {
  _component_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _payload_value?: string;
  changeset?: string;
  componentchangesetversionid?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  operation?: number;
  overriddencreatedon?: string;
  partitionid?: string;
  payloadpid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
