/**
 * msdyn_agentcoachadminsettings entity type
 */
export interface msdyn_agentcoachadminsettings {
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
  msdyn_agentcoachadminsettingsid?: string;
  msdyn_description?: string;
  msdyn_isenabled?: boolean;
  msdyn_name?: string;
  msdyn_recordtype?: number;
  msdyn_supervisorcansharewithrepresentative?: boolean;
  msdyn_supervisorscorecardsenabled?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
