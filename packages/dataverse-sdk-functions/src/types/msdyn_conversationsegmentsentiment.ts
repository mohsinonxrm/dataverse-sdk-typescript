/**
 * msdyn_conversationsegmentsentiment entity type
 */
export interface msdyn_conversationsegmentsentiment {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_conversationparticipantinsights_value?: string;
  _msdyn_sentimenttarget_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_confidence?: number;
  msdyn_conversationsegmentsentimentid?: string;
  msdyn_durationinms?: number;
  msdyn_fragmentend?: number;
  msdyn_fragmentstart?: number;
  msdyn_name?: string;
  msdyn_offsetinms?: number;
  msdyn_sentimenttype?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
