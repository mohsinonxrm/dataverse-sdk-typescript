import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_intentplaybookmap entity type
 */
export interface msdyn_intentplaybookmap {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_intentfamilyid_value?: string;
  _msdyn_intentid_value?: string;
  _msdyn_intentplaybookid_value?: string;
  _msdyn_referenceplaybookid_value?: string;
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
  msdyn_intentplaybookmapid?: string;
  msdyn_name?: string;
  msdyn_targetsource?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
