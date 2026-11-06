/**
 * msdyn_sciconversation entity type
 */
export interface msdyn_sciconversation {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_conversationaggregatedinsights_value?: string;
  _msdyn_ocrecording_value?: string;
  _msdyn_relatedactivity_value?: string;
  _msdyn_transcript_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_chatid?: string;
  msdyn_clientfilename?: string;
  msdyn_communicationtype?: number;
  msdyn_consentmodeid?: number;
  msdyn_conversationid?: string;
  msdyn_conversationscope?: number;
  msdyn_conversationstarttime?: string;
  msdyn_direction?: number;
  msdyn_name?: string;
  msdyn_sciconversationid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
