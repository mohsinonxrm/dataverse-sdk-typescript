import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * datalakeworkspacepermission entity type
 */
export interface datalakeworkspacepermission {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _workspaceid_value?: string;
  appid?: string;
  canexecute?: boolean;
  canread?: boolean;
  canwrite?: boolean;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  datalakeworkspacepermission_uniquename?: string;
  datalakeworkspacepermissionid?: string;
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
  tenantid?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  whitelistedappid?: string;
}
