import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmcalendar entity type
 */
export interface msdyn_pmcalendar {
  solutionid?: string;
  _modifiedby_value?: string;
  _createdonbehalfby_value?: string;
  statecode?: number;
  _owningbusinessunit_value?: string;
  _modifiedonbehalfby_value?: string;
  _owninguser_value?: string;
  componentstate?: number;
  createdon?: string;
  _ownerid_value?: string;
  timezoneruleversionnumber?: number;
  overwritetime?: string;
  versionnumber?: number;
  componentidunique?: string;
  ismanaged?: boolean;
  iscustomizable?: BooleanManagedProperty;
  _owningteam_value?: string;
  overriddencreatedon?: string;
  msdyn_pmcalendarid?: string;
  _createdby_value?: string;
  importsequencenumber?: number;
  msdyn_name?: string;
  modifiedon?: string;
  utcconversiontimezonecode?: number;
  statuscode?: number;
}
