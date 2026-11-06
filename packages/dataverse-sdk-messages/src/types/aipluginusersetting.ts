/**
 * aipluginusersetting entity type
 */
export interface aipluginusersetting {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _systemuser_value?: string;
  aipluginusersettingid?: string;
  createdon?: string;
  importsequencenumber?: number;
  isdefaultenvironment?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  templateindex?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
