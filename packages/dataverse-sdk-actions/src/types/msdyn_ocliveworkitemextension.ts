/**
 * msdyn_ocliveworkitemextension entity type
 */
export interface msdyn_ocliveworkitemextension {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_originalqueue_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_evaluationid?: string;
  msdyn_guardrailviolations?: number;
  msdyn_iscriticalqualitydipfired?: boolean;
  msdyn_iscriticalsupervisoralertfired?: boolean;
  msdyn_lastreroute?: string;
  msdyn_lobbyendtime?: string;
  msdyn_lobbystarttime?: string;
  msdyn_name?: string;
  msdyn_ocliveworkitemextensionid?: string;
  msdyn_ondemandscore?: number;
  msdyn_predictedcsatscore?: number;
  msdyn_qualitydips?: number;
  msdyn_reroutecount?: number;
  msdyn_reviewedcsatscore?: number;
  msdyn_score?: number;
  msdyn_supervisorqualityalerts?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
