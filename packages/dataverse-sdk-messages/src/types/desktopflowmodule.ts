import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * desktopflowmodule entity type
 */
export interface desktopflowmodule {
  overriddencreatedon?: string;
  _createdonbehalfby_value?: string;
  data?: string;
  componentstate?: number;
  desktopflowmoduleid?: string;
  versionnumber?: number;
  _owninguser_value?: string;
  overwritetime?: string;
  _ownerid_value?: string;
  createdon?: string;
  type?: number;
  timezoneruleversionnumber?: number;
  description?: string;
  data_name?: string;
  importsequencenumber?: number;
  utcconversiontimezonecode?: number;
  _createdby_value?: string;
  name?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _owningteam_value?: string;
  iscustomizable?: BooleanManagedProperty;
  solutionid?: string;
  ismanaged?: boolean;
  _owningbusinessunit_value?: string;
  statecode?: number;
  statuscode?: number;
  componentidunique?: string;
  modifiedon?: string;
}
