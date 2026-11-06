import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_organizationsolutionmap entity type
 */
export interface msdyn_organizationsolutionmap {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
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
  msdyn_name?: string;
  msdyn_organizationsolutionmapid?: string;
  msdyn_reviewstate?: number;
  msdyn_solutionbehaviour?: number;
  msdyn_solutionid?: string;
  msdyn_solutionisexternal?: boolean;
  msdyn_solutionmetadata?: string;
  msdyn_solutiontype?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
