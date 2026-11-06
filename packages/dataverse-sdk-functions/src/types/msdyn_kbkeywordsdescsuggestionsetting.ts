import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_kbkeywordsdescsuggestionsetting entity type
 */
export interface msdyn_kbkeywordsdescsuggestionsetting {
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
  msdyn_isenabled?: boolean;
  msdyn_isoverridden?: boolean;
  msdyn_kbcontentmapping?: string;
  msdyn_kbkeywordsdescsuggestionsettingid?: string;
  msdyn_kbtitlemapping?: string;
  msdyn_name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
