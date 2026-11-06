/**
 * msdyn_notesanalysisconfig entity type
 */
export interface msdyn_notesanalysisconfig {
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
  msdyn_aretermsaccepted?: boolean;
  msdyn_isadminsettingenabled?: boolean;
  msdyn_name?: string;
  msdyn_notesanalysisconfigid?: string;
  msdyn_throttlelimit?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
