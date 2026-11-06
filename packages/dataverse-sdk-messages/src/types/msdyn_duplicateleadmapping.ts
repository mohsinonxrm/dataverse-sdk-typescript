/**
 * msdyn_duplicateleadmapping entity type
 */
export interface msdyn_duplicateleadmapping {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_baseleadrecord_value?: string;
  _msdyn_dismissedby_value?: string;
  _msdyn_duplicateleadrecord_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_dismissalreason?: string;
  msdyn_dismissedat?: string;
  msdyn_duplicateleadmappingid?: string;
  msdyn_name?: string;
  msdyn_parsedreason?: string;
  msdyn_reason?: string;
  msdyn_score?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
