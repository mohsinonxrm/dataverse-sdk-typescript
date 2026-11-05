import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_autonomousagentmapping entity type
 */
export interface msdyn_autonomousagentmapping {
  _createdonbehalfby_value?: string;
  _owninguser_value?: string;
  statuscode?: number;
  componentidunique?: string;
  iscustomizable?: BooleanManagedProperty;
  _modifiedonbehalfby_value?: string;
  msdyn_autonomousagentmappingname?: string;
  componentstate?: number;
  msdyn_executioncriteriaid?: string;
  statecode?: number;
  _ownerid_value?: string;
  _owningteam_value?: string;
  _modifiedby_value?: string;
  _msdyn_autonomousprofileid_value?: string;
  msdyn_autonomousagentmappingid?: string;
  importsequencenumber?: number;
  createdon?: string;
  ismanaged?: boolean;
  solutionid?: string;
  _createdby_value?: string;
  overriddencreatedon?: string;
  utcconversiontimezonecode?: number;
  overwritetime?: string;
  modifiedon?: string;
  timezoneruleversionnumber?: number;
  _msdyn_agentconfigurationid_value?: string;
  _owningbusinessunit_value?: string;
  versionnumber?: number;
}
