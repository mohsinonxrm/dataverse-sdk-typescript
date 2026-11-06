/**
 * listoperation entity type
 */
export interface listoperation {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _listid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  added?: number;
  batchinput?: string;
  createdon?: string;
  errorcode?: number;
  errordescription?: string;
  importsequencenumber?: number;
  input?: string;
  listoperationid?: string;
  listoperationname?: string;
  listoperationprimaryname?: string;
  log?: string;
  modifiedon?: string;
  overriddencreatedon?: string;
  processed?: number;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  type?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
