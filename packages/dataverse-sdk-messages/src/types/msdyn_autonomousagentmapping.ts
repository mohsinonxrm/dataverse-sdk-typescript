import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_autonomousagentmapping entity type
 */
export interface msdyn_autonomousagentmapping {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_agentconfigurationid_value?: string;
  _msdyn_autonomousprofileid_value?: string;
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
  msdyn_autonomousagentmappingid?: string;
  msdyn_autonomousagentmappingname?: string;
  msdyn_executioncriteriaid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
