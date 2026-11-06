import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * solutioncomponentbatchconfiguration entity type
 */
export interface solutioncomponentbatchconfiguration {
  solutioncomponentbatchconfigurationid?: string;
  statecode?: number;
  _primaryentity_value?: string;
  _relatedentity_value?: string;
  overriddencreatedon?: string;
  componentstate?: number;
  solutionid?: string;
  timezoneruleversionnumber?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  utcconversiontimezonecode?: number;
  ismanaged?: boolean;
  statuscode?: number;
  _owninguser_value?: string;
  _owningteam_value?: string;
  overwritetime?: string;
  _createdby_value?: string;
  createdon?: string;
  _modifiedonbehalfby_value?: string;
  _modifiedby_value?: string;
  componentidunique?: string;
  iscustomizable?: BooleanManagedProperty;
  _createdonbehalfby_value?: string;
  _owningbusinessunit_value?: string;
  operation?: number;
  _ownerid_value?: string;
  name?: string;
  versionnumber?: number;
}
