import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * catalogassignment entity type
 */
export interface catalogassignment {
  importsequencenumber?: number;
  createdon?: string;
  name?: string;
  modifiedon?: string;
  _object_value?: string;
  statuscode?: number;
  catalogassignmentid?: string;
  solutionid?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _organizationid_value?: string;
  _modifiedonbehalfby_value?: string;
  timezoneruleversionnumber?: number;
  versionnumber?: number;
  ismanaged?: boolean;
  overriddencreatedon?: string;
  _catalogid_value?: string;
  iscustomizable?: BooleanManagedProperty;
  statecode?: number;
  utcconversiontimezonecode?: number;
  overwritetime?: string;
  componentstate?: number;
  componentidunique?: string;
}
