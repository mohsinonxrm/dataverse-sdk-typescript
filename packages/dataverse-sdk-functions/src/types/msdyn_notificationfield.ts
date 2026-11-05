import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_notificationfield entity type
 */
export interface msdyn_notificationfield {
  timezoneruleversionnumber?: number;
  componentstate?: number;
  overriddencreatedon?: string;
  _ownerid_value?: string;
  _createdonbehalfby_value?: string;
  _owningbusinessunit_value?: string;
  ismanaged?: boolean;
  msdyn_name?: string;
  createdon?: string;
  statecode?: number;
  overwritetime?: string;
  iscustomizable?: BooleanManagedProperty;
  msdyn_title?: string;
  _owninguser_value?: string;
  solutionid?: string;
  statuscode?: number;
  componentidunique?: string;
  msdyn_value?: string;
  importsequencenumber?: number;
  _owningteam_value?: string;
  msdyn_notificationfieldid?: string;
  msdyn_order?: number;
  versionnumber?: number;
  utcconversiontimezonecode?: number;
  _modifiedby_value?: string;
  msdyn_uniquename?: string;
  _createdby_value?: string;
  _modifiedonbehalfby_value?: string;
  modifiedon?: string;
}
