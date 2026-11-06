import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_capacitywrapuptime entity type
 */
export interface msdyn_capacitywrapuptime {
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
  msdyn_blockcapacityforwrapupinmin?: number;
  msdyn_blockcapacityforwrapupinseconds?: number;
  msdyn_blockcapacityforwrapuptype?: number;
  msdyn_capacitywrapuptimeid?: string;
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
