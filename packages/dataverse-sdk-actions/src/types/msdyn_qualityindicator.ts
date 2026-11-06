import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_qualityindicator entity type
 */
export interface msdyn_qualityindicator {
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
  msdyn_activeversionid?: string;
  msdyn_evaluatetarget?: string;
  msdyn_isoob?: boolean;
  msdyn_name?: string;
  msdyn_qualityindicatorid?: string;
  msdyn_qualityindicatorname?: string;
  msdyn_statuscode?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
