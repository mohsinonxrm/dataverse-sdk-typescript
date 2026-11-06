/**
 * msdyn_timespent entity type
 */
export interface msdyn_timespent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_businessprocessflow_value?: string;
  _msdyn_leadlookup_value?: string;
  _msdyn_opplookup_value?: string;
  _msdyn_stage_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_timespentid?: string;
  msdyn_timespentindays?: number;
  msdyn_timespentname?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
