import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * fxexpression entity type
 */
export interface fxexpression {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  category?: number;
  compiledexpression?: string;
  componentidunique?: string;
  componentstate?: number;
  context?: string;
  createdon?: string;
  dependencies?: string;
  entitylogicalname?: string;
  expression?: string;
  fxexpressionid?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  messagename?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  parameters?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
