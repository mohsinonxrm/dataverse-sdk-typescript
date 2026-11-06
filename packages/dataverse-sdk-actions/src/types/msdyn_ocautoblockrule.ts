import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocautoblockrule entity type
 */
export interface msdyn_ocautoblockrule {
  overriddencreatedon?: string;
  solutionid?: string;
  componentidunique?: string;
  createdon?: string;
  ismanaged?: boolean;
  importsequencenumber?: number;
  _ownerid_value?: string;
  versionnumber?: number;
  _modifiedby_value?: string;
  utcconversiontimezonecode?: number;
  _owningteam_value?: string;
  msdyn_description?: string;
  statecode?: number;
  modifiedon?: string;
  msdyn_ocautoblockruleid?: string;
  msdyn_name?: string;
  timezoneruleversionnumber?: number;
  statuscode?: number;
  _modifiedonbehalfby_value?: string;
  _owninguser_value?: string;
  msdyn_rule?: string;
  overwritetime?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  _owningbusinessunit_value?: string;
}
