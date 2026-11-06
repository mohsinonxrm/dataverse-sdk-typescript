/**
 * msdyn_kalanguagesetting entity type
 */
export interface msdyn_kalanguagesetting {
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
  msdyn_agentid?: string;
  msdyn_kalanguagesettingid?: string;
  msdyn_languagelocaleid?: string;
  msdyn_name?: string;
  msdyn_useOrgUILanguage?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
