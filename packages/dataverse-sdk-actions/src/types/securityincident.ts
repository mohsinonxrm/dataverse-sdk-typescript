/**
 * securityincident entity type
 */
export interface securityincident {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  activitycount?: number;
  additionaldata?: string;
  agentname?: string;
  agentresponse?: string;
  agentskillname?: string;
  createdon?: string;
  description?: string;
  firstactivitytime?: string;
  importsequencenumber?: number;
  incidentdata?: string;
  incidentid?: string;
  ingestionresourceid?: string;
  lastactivitytime?: string;
  locations?: string;
  modifiedon?: string;
  overriddencreatedon?: string;
  product?: string;
  recommendedaction?: string;
  resourceid?: string;
  secondarythreatactorid?: string;
  secondarythreatactortype?: string;
  securityincidentid?: string;
  statecode?: number;
  statuscode?: number;
  targetresource?: string;
  threatactorid?: string;
  threatactortype?: string;
  timegenerated?: string;
  timezoneruleversionnumber?: number;
  title?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
