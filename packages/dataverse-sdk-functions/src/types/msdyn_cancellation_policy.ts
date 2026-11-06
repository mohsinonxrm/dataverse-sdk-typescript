/**
 * msdyn_cancellation_policy entity type
 */
export interface msdyn_cancellation_policy {
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
  msdyn_cancellation_comment?: string;
  msdyn_cancellation_policyid?: string;
  msdyn_country_codes?: string;
  msdyn_end_date?: string;
  msdyn_end_date_timezone?: string;
  msdyn_name?: string;
  msdyn_postal_codes?: string;
  msdyn_start_date?: string;
  msdyn_start_date_timezone?: string;
  msdyn_state_codes?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
