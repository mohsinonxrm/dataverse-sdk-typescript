/**
 * msdyn_dmssyncstatus entity type
 */
export interface msdyn_dmssyncstatus {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_lookupfield_dmssyncrequest_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_dmssyncstatusid?: string;
  msdyn_endtime?: string;
  msdyn_errordetails?: string;
  msdyn_starttime?: string;
  msdyn_statusuniquename?: string;
  msdyn_syncdetails?: string;
  msdyn_syncstatus?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
