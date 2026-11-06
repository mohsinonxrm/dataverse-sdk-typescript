import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_optimizepatternfeaturemapping entity type
 */
export interface msdyn_optimizepatternfeaturemapping {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_optimizefeature_value?: string;
  _msdyn_optimizepattern_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_displayorder?: number;
  msdyn_name?: string;
  msdyn_optimizepatternfeaturemappingid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
