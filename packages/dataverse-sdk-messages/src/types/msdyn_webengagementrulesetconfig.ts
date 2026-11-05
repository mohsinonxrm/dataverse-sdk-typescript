import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_webengagementrulesetconfig entity type
 */
export interface msdyn_webengagementrulesetconfig {
  _owningbusinessunit_value?: string;
  timezoneruleversionnumber?: number;
  createdon?: string;
  statecode?: number;
  modifiedon?: string;
  importsequencenumber?: number;
  _createdby_value?: string;
  versionnumber?: number;
  componentstate?: number;
  componentidunique?: string;
  _owningteam_value?: string;
  _msdyn_webengagementrulesetrevision_value?: string;
  msdyn_webengagementrulesetconfigid?: string;
  msdyn_rank?: number;
  overriddencreatedon?: string;
  ismanaged?: boolean;
  msdyn_active?: boolean;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _createdonbehalfby_value?: string;
  msdyn_definition?: string;
  msdyn_description?: string;
  _owninguser_value?: string;
  iscustomizable?: BooleanManagedProperty;
  _ownerid_value?: string;
  statuscode?: number;
  solutionid?: string;
  msdyn_name?: string;
  overwritetime?: string;
  utcconversiontimezonecode?: number;
}
