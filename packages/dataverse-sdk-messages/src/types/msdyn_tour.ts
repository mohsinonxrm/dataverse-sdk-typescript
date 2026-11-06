import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_tour entity type
 */
export interface msdyn_tour {
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
  msdyn_displayname?: string;
  msdyn_labelsresource?: string;
  msdyn_path?: string;
  msdyn_tourdefinition?: string;
  msdyn_tourid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
