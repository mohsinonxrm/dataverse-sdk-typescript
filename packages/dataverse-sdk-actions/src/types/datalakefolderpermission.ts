import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * datalakefolderpermission entity type
 */
export interface datalakefolderpermission {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _folderid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  appid?: string;
  canexecute?: boolean;
  canread?: boolean;
  canwrite?: boolean;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  datalakefolderpermission_uniquename?: string;
  datalakefolderpermissionid?: string;
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
