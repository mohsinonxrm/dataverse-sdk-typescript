import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_soundnotificationsetting entity type
 */
export interface msdyn_soundnotificationsetting {
  importsequencenumber?: number;
  componentidunique?: string;
  _owningteam_value?: string;
  statuscode?: number;
  versionnumber?: number;
  msdyn_enablesound?: boolean;
  msdyn_volume?: number;
  solutionid?: string;
  _ownerid_value?: string;
  modifiedon?: string;
  msdyn_loopsound?: boolean;
  statecode?: number;
  msdyn_soundnotificationsettingid?: string;
  overwritetime?: string;
  utcconversiontimezonecode?: number;
  timezoneruleversionnumber?: number;
  _createdonbehalfby_value?: string;
  ismanaged?: boolean;
  iscustomizable?: BooleanManagedProperty;
  createdon?: string;
  _createdby_value?: string;
  _owninguser_value?: string;
  _owningbusinessunit_value?: string;
  _modifiedonbehalfby_value?: string;
  componentstate?: number;
  overriddencreatedon?: string;
  msdyn_isdefaultrecord?: boolean;
  _modifiedby_value?: string;
  _msdyn_linksoundfile_value?: string;
  msdyn_name?: string;
  msdyn_linkchannel?: string;
}
