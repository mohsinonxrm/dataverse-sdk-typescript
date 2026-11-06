import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_intentattributeset entity type
 */
export interface msdyn_intentattributeset {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_intentattributeid_value?: string;
  _msdyn_intentfamilyid_value?: string;
  _msdyn_intentid_value?: string;
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
  msdyn_intentattributesetid?: string;
  msdyn_ismandatory?: boolean;
  msdyn_name?: string;
  msdyn_occurrencecount?: number;
  msdyn_occurrencecount_last12months?: number;
  msdyn_occurrencecount_last30days?: number;
  msdyn_reviewstate?: number;
  msdyn_source?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
