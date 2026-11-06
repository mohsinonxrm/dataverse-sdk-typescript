/**
 * msdyn_distributedlock entity type
 */
export interface msdyn_distributedlock {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_forecastconfigurationid_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_distributedlockid?: string;
  msdyn_lockacquiredat?: string;
  msdyn_lockexpiresat?: string;
  msdyn_lockownerid?: string;
  msdyn_resourceid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
