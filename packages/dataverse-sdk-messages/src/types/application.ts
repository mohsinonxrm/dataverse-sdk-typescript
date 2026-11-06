import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * application entity type
 */
export interface application {
  timezoneruleversionnumber?: number;
  overriddencreatedon?: string;
  solutionid?: string;
  componentidunique?: string;
  applicationid?: string;
  _modifiedonbehalfby_value?: string;
  modifiedon?: string;
  iscustomizable?: BooleanManagedProperty;
  name?: string;
  overwritetime?: string;
  componentstate?: number;
  _createdonbehalfby_value?: string;
  utcconversiontimezonecode?: number;
  ismanaged?: boolean;
  _modifiedby_value?: string;
  commonlyused?: boolean;
  access?: number;
  createdon?: string;
  _createdby_value?: string;
  _organizationid_value?: string;
}
