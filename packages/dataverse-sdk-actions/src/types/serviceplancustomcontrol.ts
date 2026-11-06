import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * serviceplancustomcontrol entity type
 */
export interface serviceplancustomcontrol {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  customcontrolid?: string;
  featurecontrol?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  serviceplancustomcontrolid?: string;
  serviceplanid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
