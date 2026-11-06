import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * application entity type
 */
export interface application {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  access?: number;
  applicationid?: string;
  commonlyused?: boolean;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
}
