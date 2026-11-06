/**
 * msdyn_requirementresourcepreference entity type
 */
export interface msdyn_requirementresourcepreference {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_bookableresource_value?: string;
  _msdyn_resourcerequirement_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_expirationdate?: string;
  msdyn_name?: string;
  msdyn_preferencetype?: number;
  msdyn_requirementresourcepreferenceid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
