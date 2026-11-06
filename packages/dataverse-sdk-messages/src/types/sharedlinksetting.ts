import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * sharedlinksetting entity type
 */
export interface sharedlinksetting {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _extensionofrecordid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  isenabledforsharedlinkcreation?: boolean;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  sharedlinksettingid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
