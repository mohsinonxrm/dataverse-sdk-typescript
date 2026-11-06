/**
 * msdyn_dataqualitylog entity type
 */
export interface msdyn_dataqualitylog {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_suggestionid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_actionedby?: string;
  msdyn_dataqualitylogid?: string;
  msdyn_logtype?: number;
  msdyn_logvalue?: string;
  msdyn_name?: string;
  msdyn_regardingid?: string;
  msdyn_regardingtype?: string;
  msdyn_relatedid?: string;
  msdyn_relatedtype?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
