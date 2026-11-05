import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * datalakefolderpermission entity type
 */
export interface datalakefolderpermission {
  componentidunique?: string;
  datalakefolderpermissionid?: string;
  canread?: boolean;
  _ownerid_value?: string;
  solutionid?: string;
  appid?: string;
  _modifiedonbehalfby_value?: string;
  statuscode?: number;
  overwritetime?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  createdon?: string;
  utcconversiontimezonecode?: number;
  _createdonbehalfby_value?: string;
  _folderid_value?: string;
  versionnumber?: number;
  componentstate?: number;
  datalakefolderpermission_uniquename?: string;
  overriddencreatedon?: string;
  _modifiedby_value?: string;
  canwrite?: boolean;
  ismanaged?: boolean;
  timezoneruleversionnumber?: number;
  _owningteam_value?: string;
  canexecute?: boolean;
  modifiedon?: string;
  _createdby_value?: string;
  _owninguser_value?: string;
  statecode?: number;
  _owningbusinessunit_value?: string;
  name?: string;
}
