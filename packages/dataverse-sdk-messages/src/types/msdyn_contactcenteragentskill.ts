import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_contactcenteragentskill entity type
 */
export interface msdyn_contactcenteragentskill {
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
  msdyn_agentassistcategory?: string;
  msdyn_agentskillicon?: string;
  msdyn_agentskilltype?: number;
  msdyn_configuration?: string;
  msdyn_contactcenteragentskillid?: string;
  msdyn_contactcenteragentskillidentifier?: string;
  msdyn_demolink?: string;
  msdyn_description?: string;
  msdyn_isskillenabled?: boolean;
  msdyn_name?: string;
  msdyn_skillsource?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
