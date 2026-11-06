/**
 * msdyn_transcript entity type
 */
export interface msdyn_transcript {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_channelinstanceid_value?: string;
  _msdyn_liveworkitemidid_value?: string;
  _msdyn_transcripttarget_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_applicationid?: string;
  msdyn_englishtranslatedtranscriptformatted?: string;
  msdyn_englishtranslatedtranscriptformatted_name?: string;
  msdyn_iscsrassisttranscript?: boolean;
  msdyn_linkedcsrassisttranscriptids?: string;
  msdyn_name?: string;
  msdyn_originalstored?: boolean;
  msdyn_rawvoicetranscript?: string;
  msdyn_rawvoicetranscript_name?: string;
  msdyn_redactionapplied?: boolean;
  msdyn_redactionenabled?: boolean;
  msdyn_transcriptid?: string;
  msdyn_transcripturi?: string;
  msdyn_voicetranscript?: string;
  msdyn_voicetranscript_formatted?: string;
  msdyn_voicetranscript_formatted_name?: string;
  msdyn_voicetranscript_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
