import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * mobileofflineprofilesuggestionimpactedtable entity type
 */
export interface mobileofflineprofilesuggestionimpactedtable {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _mobileofflineprofileitemid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _suggestionid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  entityfilter?: string;
  impactsummary?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  ismasterentity?: boolean;
  isselected?: boolean;
  mobileofflineprofilesuggestionimpactedtableid?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  tabledisplayname?: string;
  tablelogicalname?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
