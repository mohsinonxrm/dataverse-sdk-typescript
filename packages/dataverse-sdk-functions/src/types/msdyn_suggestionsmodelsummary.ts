import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_suggestionsmodelsummary entity type
 */
export interface msdyn_suggestionsmodelsummary {
  importsequencenumber: number;
  ismanaged: boolean;
  msdyn_caseprocesseddatetime: string;
  versionnumber: number;
  msdyn_iskbtrainingsucceeded: boolean;
  overwritetime: string;
  _modifiedonbehalfby_value: string;
  msdyn_kbprocesseddatetime: string;
  msdyn_kbretraineddatetime: string;
  componentidunique: string;
  modifiedon: string;
  _organizationid_value: string;
  msdyn_kbarticlesprocessed: number;
  createdon: string;
  msdyn_traineddatetime: string;
  iscustomizable: BooleanManagedProperty;
  msdyn_suggestionsmodelsummaryid: string;
  _createdby_value: string;
  msdyn_iscasetrainingsucceeded: boolean;
  timezoneruleversionnumber: number;
  overriddencreatedon: string;
  msdyn_caseretraineddatetime: string;
  _createdonbehalfby_value: string;
  _modifiedby_value: string;
  statecode: number;
  solutionid: string;
  componentstate: number;
  msdyn_caserecordsproccessed: number;
  msdyn_name: string;
  statuscode: number;
  utcconversiontimezonecode: number;
}
