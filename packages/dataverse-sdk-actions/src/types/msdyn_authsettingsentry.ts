import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_authsettingsentry entity type
 */
export interface msdyn_authsettingsentry {
  msdyn_authsettingsentryid?: string;
  iscustomizable?: BooleanManagedProperty;
  overwritetime?: string;
  modifiedon?: string;
  versionnumber?: number;
  msdyn_key?: string;
  _ownerid_value?: string;
  _msdyn_authsettingsentid_value?: string;
  componentstate?: number;
  importsequencenumber?: number;
  _modifiedby_value?: string;
  utcconversiontimezonecode?: number;
  ismanaged?: boolean;
  statecode?: number;
  solutionid?: string;
  _createdby_value?: string;
  msdyn_value?: string;
  _createdonbehalfby_value?: string;
  msdyn_name?: string;
  componentidunique?: string;
  overriddencreatedon?: string;
  _owningbusinessunit_value?: string;
  _modifiedonbehalfby_value?: string;
  _owningteam_value?: string;
  createdon?: string;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  _owninguser_value?: string;
}
