import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_paneconfiguration entity type
 */
export interface msdyn_paneconfiguration {
  versionnumber?: number;
  utcconversiontimezonecode?: number;
  msdyn_uniquename?: string;
  msdyn_paneconfigurationid?: string;
  _createdonbehalfby_value?: string;
  solutionid?: string;
  componentstate?: number;
  modifiedon?: string;
  componentidunique?: string;
  _createdby_value?: string;
  ismanaged?: boolean;
  overwritetime?: string;
  _modifiedby_value?: string;
  statecode?: number;
  iscustomizable?: BooleanManagedProperty;
  _modifiedonbehalfby_value?: string;
  importsequencenumber?: number;
  createdon?: string;
  _organizationid_value?: string;
  msdyn_panemode?: boolean;
  msdyn_panestate?: boolean;
  overriddencreatedon?: string;
  msdyn_name?: string;
  timezoneruleversionnumber?: number;
  statuscode?: number;
}
