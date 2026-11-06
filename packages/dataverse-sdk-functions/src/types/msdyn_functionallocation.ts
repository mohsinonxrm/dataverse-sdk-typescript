/**
 * msdyn_functionallocation entity type
 */
export interface msdyn_functionallocation {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_functionallocationtype_value?: string;
  _msdyn_parentfunctionallocation_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_costcenter?: string;
  msdyn_emailaddress?: string;
  msdyn_functionallocationid?: string;
  msdyn_locationopendate?: string;
  msdyn_name?: string;
  msdyn_primarytimezone?: number;
  msdyn_sequence?: number;
  msdyn_shortname?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
