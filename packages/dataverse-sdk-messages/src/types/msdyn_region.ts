import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_region entity type
 */
export interface msdyn_region {
  overwritetime?: string;
  _owninguser_value?: string;
  utcconversiontimezonecode?: number;
  msdyn_regioncode?: string;
  msdyn_name?: string;
  _modifiedby_value?: string;
  _createdonbehalfby_value?: string;
  versionnumber?: number;
  msdyn_regionid?: string;
  componentstate?: number;
  statecode?: number;
  _msdyn_parentregionid_value?: string;
  solutionid?: string;
  ismanaged?: boolean;
  createdon?: string;
  _ownerid_value?: string;
  overriddencreatedon?: string;
  importsequencenumber?: number;
  _owningbusinessunit_value?: string;
  iscustomizable?: BooleanManagedProperty;
  componentidunique?: string;
  timezoneruleversionnumber?: number;
  modifiedon?: string;
  _createdby_value?: string;
  _modifiedonbehalfby_value?: string;
  msdyn_regionname?: string;
  _owningteam_value?: string;
  statuscode?: number;
}
