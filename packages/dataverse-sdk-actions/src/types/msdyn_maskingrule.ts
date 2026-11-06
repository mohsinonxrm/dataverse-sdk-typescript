import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_maskingrule entity type
 */
export interface msdyn_maskingrule {
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
  msdyn_description?: string;
  msdyn_enter_test_data?: string;
  msdyn_masked_character?: string;
  msdyn_masked_test_data?: string;
  msdyn_maskingruleid?: string;
  msdyn_name?: string;
  msdyn_regular_expression?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
