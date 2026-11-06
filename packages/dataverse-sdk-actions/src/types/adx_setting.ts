/**
 * adx_setting entity type
 */
export interface adx_setting {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  adx_description?: string;
  adx_encryptedcontent?: string;
  adx_name?: string;
  adx_settingid?: string;
  adx_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
