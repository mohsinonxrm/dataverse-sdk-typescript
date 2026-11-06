/**
 * msdyn_conversationsignal entity type
 */
export interface msdyn_conversationsignal {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_conversationparticipantinsights_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_actualtext?: string;
  msdyn_confidence?: number;
  msdyn_conversationsignalid?: string;
  msdyn_durationinms?: number;
  msdyn_fragmentend?: number;
  msdyn_fragmentstart?: number;
  msdyn_locale?: number;
  msdyn_name?: string;
  msdyn_offsetinms?: number;
  msdyn_text?: string;
  msdyn_type?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
