/**
 * governanceconfiguration entity type
 */
export interface governanceconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  configurationtype?: string;
  configurationvalues?: string;
  createdon?: string;
  enabled?: boolean;
  governanceconfigurationid?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  scope?: string;
  scopeid?: string;
  statecode?: number;
  statuscode?: number;
  tenantid?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  version?: string;
  versionnumber?: number;
}
