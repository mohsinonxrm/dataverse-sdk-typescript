import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_formmapping entity type
 */
export interface msdyn_formmapping {
  versionnumber?: number;
  solutionid?: string;
  _owninguser_value?: string;
  msdyn_context?: string;
  overriddencreatedon?: string;
  _cardid_value?: string;
  iscustomizable?: BooleanManagedProperty;
  allowedoperations?: string;
  overwritetime?: string;
  _customapiid_value?: string;
  msdyn_formname?: string;
  _ownerid_value?: string;
  _owningteam_value?: string;
  createdon?: string;
  _createdonbehalfby_value?: string;
  timezoneruleversionnumber?: number;
  operation?: number;
  _createdby_value?: string;
  _owningbusinessunit_value?: string;
  statecode?: number;
  _modifiedonbehalfby_value?: string;
  baseentity?: string;
  ismanaged?: boolean;
  msdyn_formmappingid?: string;
  msdyn_requestedcolumns?: string;
  componentidunique?: string;
  utcconversiontimezonecode?: number;
  modifiedon?: string;
  componentstate?: number;
  importsequencenumber?: number;
  statuscode?: number;
  _modifiedby_value?: string;
}
