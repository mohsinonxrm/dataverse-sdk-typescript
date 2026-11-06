/**
 * msdyn_casetopic entity type
 */
export interface msdyn_casetopic {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_casetopicid?: string;
  msdyn_name?: string;
  msdyn_similarityscore?: number;
  msdyn_topiccounts?: number;
  msdyn_topicdate?: string;
  msdyn_topicpercentage?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
