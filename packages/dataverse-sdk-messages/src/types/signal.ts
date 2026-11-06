/**
 * signal entity type
 */
export interface signal {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  alternativekey?: string;
  contents?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  properties?: string;
  signalid?: string;
  signaltype?: string;
  ttlinseconds?: number;
  userid?: string;
  versionnumber?: number;
}
