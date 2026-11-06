import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_assignmentconfigurationstep entity type
 */
export interface msdyn_assignmentconfigurationstep {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_assignmentconfigurationid_value?: string;
  _msdyn_rulesetid_value?: string;
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
  msdyn_assignmentconfigurationstepid?: string;
  msdyn_isdefaultruleset?: boolean;
  msdyn_name?: string;
  msdyn_steporder?: number;
  msdyn_type?: number;
  msdyn_uniquename?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
