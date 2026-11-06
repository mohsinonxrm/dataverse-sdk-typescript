/**
 * msdyn_modelpreviewstatus entity type
 */
export interface msdyn_modelpreviewstatus {
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
  msdyn_leadpredictionmodelenabled?: boolean;
  msdyn_modelpreviewstatusid?: string;
  msdyn_name?: string;
  msdyn_opportunitypredictionmodelenabled?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
