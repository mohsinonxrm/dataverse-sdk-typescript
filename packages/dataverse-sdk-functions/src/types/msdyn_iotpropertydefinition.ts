/**
 * msdyn_iotpropertydefinition entity type
 */
export interface msdyn_iotpropertydefinition {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_parentproperty_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_additionalproperties?: string;
  msdyn_editable?: boolean;
  msdyn_iotpropertydefinitionid?: string;
  msdyn_name?: string;
  msdyn_type?: number;
  msdyn_unit?: string;
  msdyn_visible?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
