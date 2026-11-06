import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * serviceplan entity type
 */
export interface serviceplan {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  accessmode?: number;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  displayname?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  moreinfourl?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  serviceplanid?: string;
  solutionid?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
