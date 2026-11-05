import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_octag entity type
 */
export interface msdyn_octag {
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  utcconversiontimezonecode?: number;
  msdyn_name?: string;
  _createdonbehalfby_value?: string;
  _modifiedonbehalfby_value?: string;
  overriddencreatedon?: string;
  importsequencenumber?: number;
  _modifiedby_value?: string;
  _organizationid_value?: string;
  statuscode?: number;
  componentstate?: number;
  solutionid?: string;
  timezoneruleversionnumber?: number;
  modifiedon?: string;
  statecode?: number;
  msdyn_octagid?: string;
  componentidunique?: string;
  versionnumber?: number;
  _createdby_value?: string;
  createdon?: string;
  overwritetime?: string;
}
