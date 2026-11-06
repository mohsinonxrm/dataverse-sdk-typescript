/**
 * msdyn_suggestionrequestpayload entity type
 */
export interface msdyn_suggestionrequestpayload {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_suggestionfor_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_requestpayload?: string;
  msdyn_responsepayload?: string;
  msdyn_suggestedentitylogicalname?: string;
  msdyn_suggestionrequestpayloadid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
