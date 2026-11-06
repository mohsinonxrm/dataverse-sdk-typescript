import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_kbkeywordsdescsuggestionsetting entity type
 */
export interface msdyn_kbkeywordsdescsuggestionsetting {
  _createdby_value?: string;
  solutionid?: string;
  overwritetime?: string;
  timezoneruleversionnumber?: number;
  statecode?: number;
  modifiedon?: string;
  msdyn_kbtitlemapping?: string;
  msdyn_kbcontentmapping?: string;
  _modifiedonbehalfby_value?: string;
  _modifiedby_value?: string;
  statuscode?: number;
  msdyn_kbkeywordsdescsuggestionsettingid?: string;
  ismanaged?: boolean;
  versionnumber?: number;
  _createdonbehalfby_value?: string;
  createdon?: string;
  componentstate?: number;
  msdyn_isoverridden?: boolean;
  componentidunique?: string;
  _organizationid_value?: string;
  overriddencreatedon?: string;
  msdyn_isenabled?: boolean;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  msdyn_name?: string;
  utcconversiontimezonecode?: number;
}
