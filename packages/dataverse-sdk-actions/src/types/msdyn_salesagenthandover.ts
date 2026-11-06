/**
 * msdyn_salesagenthandover entity type
 */
export interface msdyn_salesagenthandover {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_regardingid_value?: string;
  _msdyn_salesagentrun_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_handoveractions?: string;
  msdyn_handoverintent?: number;
  msdyn_leadrating?: number;
  msdyn_name?: string;
  msdyn_salesagenthandoverid?: string;
  msdyn_salesagenthandovertarget?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
