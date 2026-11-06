import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_agentcoachplaybookinstructions entity type
 */
export interface msdyn_agentcoachplaybookinstructions {
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
  msdyn_agentcoachplaybookinstructionsid?: string;
  msdyn_businessunitids?: string;
  msdyn_description?: string;
  msdyn_instructionid?: string;
  msdyn_instructionname?: string;
  msdyn_recordtype?: string;
  msdyn_state?: number;
  msdyn_version?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
