import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_appconfiguration entity type
 */
export interface msdyn_appconfiguration {
  componentidunique?: string;
  versionnumber?: number;
  _owningbusinessunit_value?: string;
  modifiedon?: string;
  statuscode?: number;
  importsequencenumber?: number;
  _createdonbehalfby_value?: string;
  _owningteam_value?: string;
  msdyn_appmoduleuniquename?: string;
  _modifiedonbehalfby_value?: string;
  statecode?: number;
  _modifiedby_value?: string;
  _createdby_value?: string;
  msdyn_profileorder?: number;
  msdyn_uniquename?: string;
  msdyn_description?: string;
  msdyn_name?: string;
  overwritetime?: string;
  iscustomizable?: BooleanManagedProperty;
  utcconversiontimezonecode?: number;
  createdon?: string;
  _owninguser_value?: string;
  _ownerid_value?: string;
  overriddencreatedon?: string;
  msdyn_productivitypaneuniquename?: string;
  msdyn_appconfigurationid?: string;
  timezoneruleversionnumber?: number;
  componentstate?: number;
  solutionid?: string;
  ismanaged?: boolean;
}
