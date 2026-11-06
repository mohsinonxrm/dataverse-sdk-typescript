/**
 * adx_webformsession entity type
 */
export interface adx_webformsession {
  _adx_contact_value?: string;
  _adx_systemuser_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _mspp_webformid_value?: string;
  _mspp_webformstepid_value?: string;
  _organizationid_value?: string;
  adx_anonymousidentification?: string;
  adx_currentstepindex?: number;
  adx_name?: string;
  adx_primaryrecordentitykeyname?: string;
  adx_primaryrecordentitylogicalname?: string;
  adx_primaryrecordid?: string;
  adx_stephistory?: string;
  adx_userhostaddress?: string;
  adx_useridentityname?: string;
  adx_webformsessionid?: string;
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
