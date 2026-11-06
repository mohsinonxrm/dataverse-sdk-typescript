import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * aicopilot entity type
 */
export interface aicopilot {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  aicopilotid?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  displayname?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
