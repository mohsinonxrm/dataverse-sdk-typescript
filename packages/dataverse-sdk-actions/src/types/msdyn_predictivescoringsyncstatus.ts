/**
 * msdyn_predictivescoringsyncstatus entity type
 */
export interface msdyn_predictivescoringsyncstatus {
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
  msdyn_calculatedfieldcount?: number;
  msdyn_eacstatusmodifiedon?: string;
  msdyn_eacsyncstatus?: boolean;
  msdyn_name?: string;
  msdyn_predictivescoringsyncstatusid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
