/**
 * msdyn_predictivescore entity type
 */
export interface msdyn_predictivescore {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_contributingpredictionids?: string;
  msdyn_entityid?: string;
  msdyn_entitytype?: string;
  msdyn_grade?: number;
  msdyn_name?: string;
  msdyn_predictivescoreid?: string;
  msdyn_score?: number;
  msdyn_scoredon?: string;
  msdyn_scorereasons?: string;
  msdyn_scoretrend?: number;
  msdyn_similaropportunities?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
