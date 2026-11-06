import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_optimizefeature entity type
 */
export interface msdyn_optimizefeature {
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
  msdyn_constraints?: string;
  msdyn_description?: string;
  msdyn_name?: string;
  msdyn_optimizeagenttype?: number;
  msdyn_optimizefeatureid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
