import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_intentplaybook entity type
 */
export interface msdyn_intentplaybook {
  msdyn_intentplaybookid?: string;
  statecode?: number;
  _ownerid_value?: string;
  iscustomizable?: BooleanManagedProperty;
  modifiedon?: string;
  msdyn_description?: string;
  _createdby_value?: string;
  _modifiedonbehalfby_value?: string;
  componentstate?: number;
  ismanaged?: boolean;
  createdon?: string;
  _createdonbehalfby_value?: string;
  _msdyn_intentfamilyid_value?: string;
  utcconversiontimezonecode?: number;
  _owningbusinessunit_value?: string;
  solutionid?: string;
  msdyn_name?: string;
  _owninguser_value?: string;
  _owningteam_value?: string;
  timezoneruleversionnumber?: number;
  versionnumber?: number;
  componentidunique?: string;
  statuscode?: number;
  overwritetime?: string;
  importsequencenumber?: number;
  _modifiedby_value?: string;
  overriddencreatedon?: string;
}
