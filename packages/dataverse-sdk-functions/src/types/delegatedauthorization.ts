/**
 * delegatedauthorization entity type
 */
export interface delegatedauthorization {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  botid?: string;
  createdon?: string;
  delegatedauthorizationid?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  providertype?: number;
  roadmapprojectid?: string;
  sharepointlistid?: string;
  sharepointsite?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
