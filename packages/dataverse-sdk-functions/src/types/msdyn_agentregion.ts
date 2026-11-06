import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_agentregion entity type
 */
export interface msdyn_agentregion {
  _msdyn_systemuserid_value?: string;
  _owningbusinessunit_value?: string;
  _modifiedby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  _ownerid_value?: string;
  statecode?: number;
  ismanaged?: boolean;
  componentstate?: number;
  _createdonbehalfby_value?: string;
  modifiedon?: string;
  solutionid?: string;
  timezoneruleversionnumber?: number;
  _modifiedonbehalfby_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  versionnumber?: number;
  _createdby_value?: string;
  statuscode?: number;
  overriddencreatedon?: string;
  importsequencenumber?: number;
  createdon?: string;
  overwritetime?: string;
  _owningteam_value?: string;
  msdyn_agentregionid?: string;
  _msdyn_regionid_value?: string;
  msdyn_name?: string;
  utcconversiontimezonecode?: number;
}
