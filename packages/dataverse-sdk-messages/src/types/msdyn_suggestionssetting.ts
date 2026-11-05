import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_suggestionssetting entity type
 */
export interface msdyn_suggestionssetting {
  statecode?: number;
  msdyn_kbisenabled?: boolean;
  msdyn_caseisenabled?: boolean;
  msdyn_casepreprocessingrule?: string;
  msdyn_casetitlemodelmapping?: string;
  _createdby_value?: string;
  msdyn_kbcustommodelmapping?: string;
  msdyn_kbtitlemodelmapping?: string;
  utcconversiontimezonecode?: number;
  ismanaged?: boolean;
  msdyn_name?: string;
  msdyn_casecustommodelmapping?: string;
  _organizationid_value?: string;
  msdyn_refreshonsaveevent?: boolean;
  msdyn_casecustommapping?: string;
  statuscode?: number;
  msdyn_casetitlemapping?: string;
  msdyn_kbpreprocessingrule?: string;
  msdyn_casedetailmapping?: string;
  componentidunique?: string;
  msdyn_suggestionssettingid?: string;
  _modifiedonbehalfby_value?: string;
  solutionid?: string;
  overriddencreatedon?: string;
  msdyn_kbpreprocessingruleenabled?: boolean;
  msdyn_kbcontentmapping?: string;
  msdyn_kbcustommapping?: string;
  modifiedon?: string;
  importsequencenumber?: number;
  msdyn_kbcontentmodelmapping?: string;
  createdon?: string;
  iscustomizable?: BooleanManagedProperty;
  componentstate?: number;
  versionnumber?: number;
  msdyn_kbtitlemapping?: string;
  msdyn_casedetailmodelmapping?: string;
  _modifiedby_value?: string;
  timezoneruleversionnumber?: number;
  msdyn_casepreprocessingruleenabled?: boolean;
  overwritetime?: string;
  _createdonbehalfby_value?: string;
}
