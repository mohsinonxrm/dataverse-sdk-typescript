import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocautomatedactionrulesmapping entity type
 */
export interface msdyn_ocautomatedactionrulesmapping {
  createdon?: string;
  overwritetime?: string;
  _owningbusinessunit_value?: string;
  _createdby_value?: string;
  solutionid?: string;
  _msdyn_liveworkstreamid_value?: string;
  _msdyn_automatedactionruleid_value?: string;
  statuscode?: number;
  utcconversiontimezonecode?: number;
  _modifiedby_value?: string;
  componentstate?: number;
  timezoneruleversionnumber?: number;
  msdyn_name?: string;
  overriddencreatedon?: string;
  _owninguser_value?: string;
  _modifiedonbehalfby_value?: string;
  _owningteam_value?: string;
  iscustomizable?: BooleanManagedProperty;
  componentidunique?: string;
  modifiedon?: string;
  importsequencenumber?: number;
  versionnumber?: number;
  _createdonbehalfby_value?: string;
  statecode?: number;
  _ownerid_value?: string;
  msdyn_ocautomatedactionrulesmappingid?: string;
  ismanaged?: boolean;
}
