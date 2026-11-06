/**
 * msdyn_authentication_profile entity type
 */
export interface msdyn_authentication_profile {
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
  msdyn_additionalparameters?: string;
  msdyn_authentication_profileid?: string;
  msdyn_authenticationlockcounter?: number;
  msdyn_customeruniqueid?: string;
  msdyn_primarycolumn?: string;
  msdyn_voicebiometricsconsentstatus?: number;
  msdyn_voicebiometricsenrollmentstatus?: string;
  msdyn_voicebiometricsoptedoutreason?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
