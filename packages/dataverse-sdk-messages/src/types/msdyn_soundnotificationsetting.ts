import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_soundnotificationsetting entity type
 */
export interface msdyn_soundnotificationsetting {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_linksoundfile_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_enablesound?: boolean;
  msdyn_isdefaultrecord?: boolean;
  msdyn_linkchannel?: string;
  msdyn_loopsound?: boolean;
  msdyn_name?: string;
  msdyn_soundnotificationsettingid?: string;
  msdyn_volume?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
