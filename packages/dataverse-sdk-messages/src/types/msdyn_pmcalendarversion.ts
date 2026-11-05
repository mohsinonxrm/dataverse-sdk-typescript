import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmcalendarversion entity type
 */
export interface msdyn_pmcalendarversion {
  utcconversiontimezonecode?: number;
  _owninguser_value?: string;
  overwritetime?: string;
  msdyn_name?: string;
  importsequencenumber?: number;
  _msdyn_pmcalendarid_value?: string;
  ismanaged?: boolean;
  _owningbusinessunit_value?: string;
  msdyn_version?: number;
  timezoneruleversionnumber?: number;
  _modifiedonbehalfby_value?: string;
  createdon?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  msdyn_pmcalendarversionid?: string;
  _owningteam_value?: string;
  componentstate?: number;
  componentidunique?: string;
  iscustomizable?: BooleanManagedProperty;
  modifiedon?: string;
  _ownerid_value?: string;
  overriddencreatedon?: string;
  versionnumber?: number;
  _createdby_value?: string;
  statecode?: number;
  msdyn_configuration?: string;
  solutionid?: string;
  statuscode?: number;
}
