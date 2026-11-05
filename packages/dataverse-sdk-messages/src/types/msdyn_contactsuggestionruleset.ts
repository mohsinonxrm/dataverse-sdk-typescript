import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_contactsuggestionruleset entity type
 */
export interface msdyn_contactsuggestionruleset {
  _owningteam_value?: string;
  statuscode?: number;
  componentstate?: number;
  _createdonbehalfby_value?: string;
  msdyn_name?: string;
  iscustomizable?: BooleanManagedProperty;
  solutionid?: string;
  versionnumber?: number;
  _modifiedonbehalfby_value?: string;
  msdyn_uniquename?: string;
  statecode?: number;
  _createdby_value?: string;
  _modifiedby_value?: string;
  msdyn_contactsuggestionrulesetid?: string;
  utcconversiontimezonecode?: number;
  ismanaged?: boolean;
  _ownerid_value?: string;
  createdon?: string;
  modifiedon?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  timezoneruleversionnumber?: number;
  overriddencreatedon?: string;
  importsequencenumber?: number;
  _msdyn_entitytype_value?: string;
  overwritetime?: string;
  _owningbusinessunit_value?: string;
}
