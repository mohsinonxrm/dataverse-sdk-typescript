/**
 * msdyn_propertylog entity type
 */
export interface msdyn_propertylog {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_customerasset_value?: string;
  _msdyn_functionallocation_value?: string;
  _msdyn_property_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_booleanvalue?: boolean;
  msdyn_datevalue?: string;
  msdyn_delta?: number;
  msdyn_islatest?: boolean;
  msdyn_name?: string;
  msdyn_numbervalue?: number;
  msdyn_propertylogid?: string;
  msdyn_readingtime?: string;
  msdyn_stringvalue?: string;
  msdyn_valuetodisplay?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
