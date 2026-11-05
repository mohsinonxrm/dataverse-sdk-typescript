import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_chtprofileconfiguration entity type
 */
export interface msdyn_chtprofileconfiguration {
  statecode?: number;
  _modifiedonbehalfby_value?: string;
  _createdby_value?: string;
  componentidunique?: string;
  _organizationid_value?: string;
  _msdyn_appconfigurationid_value?: string;
  importsequencenumber?: number;
  statuscode?: number;
  versionnumber?: number;
  msdyn_chtprofileconfigurationid?: string;
  msdyn_chtfeature?: number;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  overwritetime?: string;
  msdyn_enabled?: boolean;
  utcconversiontimezonecode?: number;
  ismanaged?: boolean;
  iscustomizable?: BooleanManagedProperty;
  overriddencreatedon?: string;
  modifiedon?: string;
  createdon?: string;
  componentstate?: number;
  timezoneruleversionnumber?: number;
  msdyn_name?: string;
  solutionid?: string;
}
