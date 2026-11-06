import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_intentfamily_adminassignment entity type
 */
export interface msdyn_intentfamily_adminassignment {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_intentfamilyid_value?: string;
  _msdyn_teamid_value?: string;
  _msdyn_userid_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_adminroletype?: number;
  msdyn_intentfamily_adminassignmentid?: string;
  msdyn_name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
