import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_recommendedactionsourceagentconfig entity type
 */
export interface msdyn_recommendedactionsourceagentconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_salesagentprofileid_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_actioningestionmode?: number;
  msdyn_agentimpactmapping?: string;
  msdyn_agentname?: string;
  msdyn_custominstruction?: string;
  msdyn_internalprioritizationinstruction?: string;
  msdyn_isrecommendedactionagentenabled?: boolean;
  msdyn_pullsourceapiconfig?: string;
  msdyn_recommendedactionsourceagentconfigid?: string;
  msdyn_sourceagentuniqueid?: string;
  msdyn_sourcedescription?: string;
  msdyn_sourceprofileversion?: string;
  msdyn_syncactionexecutionstateapiconfig?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
