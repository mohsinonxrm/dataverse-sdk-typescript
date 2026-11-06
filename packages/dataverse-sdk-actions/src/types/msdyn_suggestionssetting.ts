import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_suggestionssetting entity type
 */
export interface msdyn_suggestionssetting {
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
  msdyn_casecustommapping?: string;
  msdyn_casecustommodelmapping?: string;
  msdyn_casedetailmapping?: string;
  msdyn_casedetailmodelmapping?: string;
  msdyn_caseisenabled?: boolean;
  msdyn_casepreprocessingrule?: string;
  msdyn_casepreprocessingruleenabled?: boolean;
  msdyn_casetitlemapping?: string;
  msdyn_casetitlemodelmapping?: string;
  msdyn_kbcontentmapping?: string;
  msdyn_kbcontentmodelmapping?: string;
  msdyn_kbcustommapping?: string;
  msdyn_kbcustommodelmapping?: string;
  msdyn_kbisenabled?: boolean;
  msdyn_kbpreprocessingrule?: string;
  msdyn_kbpreprocessingruleenabled?: boolean;
  msdyn_kbtitlemapping?: string;
  msdyn_kbtitlemodelmapping?: string;
  msdyn_name?: string;
  msdyn_refreshonsaveevent?: boolean;
  msdyn_suggestionssettingid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
