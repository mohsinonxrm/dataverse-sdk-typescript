/**
 * msdyn_conversationactionitem entity type
 */
export interface msdyn_conversationactionitem {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_conversationparticipantinsights_value?: string;
  _msdyn_createdactivity_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_actionitemjson?: string;
  msdyn_conversationactionitemid?: string;
  msdyn_defaulttext?: string;
  msdyn_durationinms?: number;
  msdyn_externalresourceuri?: string;
  msdyn_fragmentend?: number;
  msdyn_fragmentstart?: number;
  msdyn_locale?: number;
  msdyn_name?: string;
  msdyn_offsetinms?: number;
  msdyn_state?: number;
  msdyn_type?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
