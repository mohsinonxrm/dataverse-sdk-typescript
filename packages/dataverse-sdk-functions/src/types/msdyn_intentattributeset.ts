import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_intentattributeset entity type
 */
export interface msdyn_intentattributeset {
  ismanaged?: boolean;
  msdyn_reviewstate?: number;
  importsequencenumber?: number;
  msdyn_occurrencecount_last30days?: number;
  msdyn_name?: string;
  statuscode?: number;
  _createdonbehalfby_value?: string;
  msdyn_source?: number;
  _owninguser_value?: string;
  msdyn_intentattributesetid?: string;
  msdyn_ismandatory?: boolean;
  msdyn_occurrencecount_last12months?: number;
  componentidunique?: string;
  componentstate?: number;
  _msdyn_intentfamilyid_value?: string;
  _modifiedonbehalfby_value?: string;
  utcconversiontimezonecode?: number;
  _owningbusinessunit_value?: string;
  _msdyn_intentattributeid_value?: string;
  _owningteam_value?: string;
  versionnumber?: number;
  statecode?: number;
  _modifiedby_value?: string;
  _createdby_value?: string;
  _ownerid_value?: string;
  solutionid?: string;
  timezoneruleversionnumber?: number;
  msdyn_occurrencecount?: number;
  iscustomizable?: BooleanManagedProperty;
  overwritetime?: string;
  _msdyn_intentid_value?: string;
  modifiedon?: string;
  createdon?: string;
  overriddencreatedon?: string;
}
