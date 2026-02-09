import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_copilotcaseformfillsetting entity type
 */
export interface msdyn_copilotcaseformfillsetting {
  componentstate: number;
  _modifiedby_value: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
  timezoneruleversionnumber: number;
  msdyn_copilotcaseformfillsettingid: string;
  _owninguser_value: string;
  _modifiedonbehalfby_value: string;
  msdyn_name: string;
  iscustomizable: BooleanManagedProperty;
  _owningbusinessunit_value: string;
  _owningteam_value: string;
  createdon: string;
  overriddencreatedon: string;
  componentidunique: string;
  _createdby_value: string;
  statuscode: number;
  ismanaged: boolean;
  solutionid: string;
  msdyn_caseresolutionconfiguration: string;
  overwritetime: string;
  modifiedon: string;
  _ownerid_value: string;
  importsequencenumber: number;
  statecode: number;
  _createdonbehalfby_value: string;
}
