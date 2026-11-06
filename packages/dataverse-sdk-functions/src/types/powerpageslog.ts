/**
 * powerpageslog entity type
 */
export interface powerpageslog {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  clientip?: string;
  content?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  portalid?: string;
  powerpageslogid?: string;
  requestpath?: string;
  requesturl?: string;
  ttlinseconds?: number;
  type?: number;
  versionnumber?: number;
}
