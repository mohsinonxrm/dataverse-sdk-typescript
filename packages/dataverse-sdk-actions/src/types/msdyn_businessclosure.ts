/**
 * msdyn_businessclosure entity type
 */
export interface msdyn_businessclosure {
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
  msdyn_businessclosureid?: string;
  msdyn_duration?: number;
  msdyn_endtime?: string;
  msdyn_isalldayevent?: boolean;
  msdyn_name?: string;
  msdyn_selectedyear?: number;
  msdyn_starttime?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
