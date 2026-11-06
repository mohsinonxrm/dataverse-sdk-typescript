/**
 * msdyn_admin_pin entity type
 */
export interface msdyn_admin_pin {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_businessunit_scopeid_value?: string;
  _msdyn_contactid_value?: string;
  _msdyn_queueid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_admin_pinid?: string;
  msdyn_pin_scope?: string;
  msdyn_pin_type?: string;
  name?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
