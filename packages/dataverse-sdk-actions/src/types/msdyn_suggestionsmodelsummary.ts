import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_suggestionsmodelsummary entity type
 */
export interface msdyn_suggestionsmodelsummary {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_caseprocesseddatetime?: string;
  msdyn_caserecordsproccessed?: number;
  msdyn_caseretraineddatetime?: string;
  msdyn_iscasetrainingsucceeded?: boolean;
  msdyn_iskbtrainingsucceeded?: boolean;
  msdyn_kbarticlesprocessed?: number;
  msdyn_kbprocesseddatetime?: string;
  msdyn_kbretraineddatetime?: string;
  msdyn_name?: string;
  msdyn_suggestionsmodelsummaryid?: string;
  msdyn_traineddatetime?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
