import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocautomatedactionrule entity type
 */
export interface msdyn_ocautomatedactionrule {
  _owningbusinessunit_value?: string;
  componentidunique?: string;
  msdyn_operator?: number;
  _owningteam_value?: string;
  msdyn_order?: number;
  utcconversiontimezonecode?: number;
  solutionid?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  msdyn_actiontype?: number;
  overriddencreatedon?: string;
  ismanaged?: boolean;
  msdyn_eventtype?: number;
  timezoneruleversionnumber?: number;
  _modifiedonbehalfby_value?: string;
  importsequencenumber?: number;
  _createdonbehalfby_value?: string;
  msdyn_eventfrequency?: number;
  createdon?: string;
  statuscode?: number;
  overwritetime?: string;
  statecode?: number;
  msdyn_ocautomatedactionruleid?: string;
  _ownerid_value?: string;
  versionnumber?: number;
  _createdby_value?: string;
  msdyn_eventinterval?: number;
  msdyn_name?: string;
  modifiedon?: string;
  _modifiedby_value?: string;
  _owninguser_value?: string;
}
