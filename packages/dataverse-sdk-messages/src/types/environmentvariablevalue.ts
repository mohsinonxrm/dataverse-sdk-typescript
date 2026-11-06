import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * environmentvariablevalue entity type
 */
export interface environmentvariablevalue {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _environmentvariabledefinitionid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentstate?: number;
  createdon?: string;
  environmentvariablevalueid?: string;
  environmentvariablevalueidunique?: string;
  importsequencenumber?: number;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  schemaname?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  value?: string;
  versionnumber?: number;
}
