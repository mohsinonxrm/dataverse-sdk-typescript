/**
 * msdyn_conversationsummaryinteraction entity type
 */
export interface msdyn_conversationsummaryinteraction {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_conversationid_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_conversationsummaryinteractionid?: string;
  msdyn_feedbackverbatim?: string;
  msdyn_helpful?: boolean;
  msdyn_interactioncontext?: string;
  msdyn_issuefeedbackverbatim?: string;
  msdyn_issueinaccurate?: boolean;
  msdyn_name?: string;
  msdyn_resolutionfeedbackverbatim?: string;
  msdyn_resolutioninaccurate?: boolean;
  msdyn_summary?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
