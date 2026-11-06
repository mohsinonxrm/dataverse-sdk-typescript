/**
 * msdyn_dmssyncrequest entity type
 */
export interface msdyn_dmssyncrequest {
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
  msdyn_additionalproperties?: string;
  msdyn_correlationid?: string;
  msdyn_dmssyncrequestid?: string;
  msdyn_entitymapping?: string;
  msdyn_requesttype?: string;
  msdyn_requestuniquename?: string;
  msdyn_syncparameters?: string;
  msdyn_syncscenario?: string;
  msdyn_userobjectid?: string;
  msdyn_usertenantid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
