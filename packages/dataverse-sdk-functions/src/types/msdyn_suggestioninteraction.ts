/**
 * msdyn_suggestioninteraction entity type
 */
export interface msdyn_suggestioninteraction {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_suggestedentity_value?: string;
  _msdyn_suggestionfor_value?: string;
  _msdyn_suggestionrequestpayload_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_interactioncontext?: string;
  msdyn_interactiontype?: string;
  msdyn_suggestioninteractionid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
