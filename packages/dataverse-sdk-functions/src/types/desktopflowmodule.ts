import type { BooleanManagedProperty } from './BooleanManagedProperty.js';

/**
 * desktopflowmodule entity type
 */
export interface desktopflowmodule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  data?: string;
  data_name?: string;
  description?: string;
  desktopflowmoduleid?: string;
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
  type?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
