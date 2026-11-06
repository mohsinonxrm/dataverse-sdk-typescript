import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_formmapping entity type
 */
export interface msdyn_formmapping {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _customapiid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  allowedoperations?: string;
  baseentity?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_context?: string;
  msdyn_formmappingid?: string;
  msdyn_formname?: string;
  msdyn_requestedcolumns?: string;
  operation?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
