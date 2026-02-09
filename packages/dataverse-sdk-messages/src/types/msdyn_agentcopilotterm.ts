import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_agentcopilotterm entity type
 */
export interface msdyn_agentcopilotterm {
  importsequencenumber: number;
  solutionid: string;
  _createdby_value: string;
  statuscode: number;
  msdyn_description: string;
  _organizationid_value: string;
  ismanaged: boolean;
  componentidunique: string;
  msdyn_copilottermtype: number;
  modifiedon: string;
  createdon: string;
  statecode: number;
  msdyn_agentcopilottermid: string;
  overwritetime: string;
  utcconversiontimezonecode: number;
  overriddencreatedon: string;
  versionnumber: number;
  msdyn_name: string;
  _modifiedby_value: string;
  _modifiedonbehalfby_value: string;
  timezoneruleversionnumber: number;
  componentstate: number;
  iscustomizable: BooleanManagedProperty;
  _createdonbehalfby_value: string;
}
