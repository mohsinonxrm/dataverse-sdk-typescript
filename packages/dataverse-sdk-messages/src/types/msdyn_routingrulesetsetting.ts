/**
 * msdyn_routingrulesetsetting entity type
 */
export interface msdyn_routingrulesetsetting {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_ismultipleactiveroutingrulesetallowed?: boolean;
  msdyn_name?: string;
  msdyn_routingrulesetsettingid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
