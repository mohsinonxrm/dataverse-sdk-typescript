/**
 * msdyn_leaddelinkresult entity type
 */
export interface msdyn_leaddelinkresult {
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
  msdyn_accountid?: string;
  msdyn_contactid?: string;
  msdyn_isaccountdelinked?: string;
  msdyn_iscontactdelinked?: string;
  msdyn_leaddelinkresultid?: string;
  msdyn_leadid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
