/**
 * msdyn_ocexternalcontext entity type
 */
export interface msdyn_ocexternalcontext {
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
  msdyn_authenticationcorrelation?: string;
  msdyn_isauthenticated?: boolean;
  msdyn_name?: string;
  msdyn_ocexternalcontextid?: string;
  msdyn_transcript?: string;
  msdyn_transcript_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
