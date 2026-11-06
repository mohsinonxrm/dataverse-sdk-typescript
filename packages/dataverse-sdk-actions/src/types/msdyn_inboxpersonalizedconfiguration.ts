/**
 * msdyn_inboxpersonalizedconfiguration entity type
 */
export interface msdyn_inboxpersonalizedconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_configuration?: string;
  msdyn_defaultsort?: string;
  msdyn_inboxpersonalizedconfigurationid?: string;
  msdyn_isdefault?: boolean;
  msdyn_isvisible?: boolean;
  msdyn_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
