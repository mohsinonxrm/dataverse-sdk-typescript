/**
 * msdyn_dataqualitysuggestion entity type
 */
export interface msdyn_dataqualitysuggestion {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_rawinsightentitylinkid_value?: string;
  _msdyn_sourceid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_agentmode?: number;
  msdyn_candidatecount?: number;
  msdyn_confidence?: number;
  msdyn_dataqualitysuggestionid?: string;
  msdyn_deamenuaction?: number;
  msdyn_name?: string;
  msdyn_reason?: string;
  msdyn_regardingid?: string;
  msdyn_regardingtype?: string;
  msdyn_relatedid?: string;
  msdyn_relatedrecordassociationkind?: number;
  msdyn_relatedrelationship?: string;
  msdyn_relatedtype?: string;
  msdyn_suggestionvalue?: string;
  msdyn_target?: string;
  msdyn_type?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
