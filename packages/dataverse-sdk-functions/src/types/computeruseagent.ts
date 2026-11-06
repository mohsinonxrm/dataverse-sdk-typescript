import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * computeruseagent entity type
 */
export interface computeruseagent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  additionalconfiguration?: string;
  additionalconfigurationversion?: string;
  componentidunique?: string;
  componentstate?: number;
  computeruseagentid?: string;
  createdon?: string;
  description?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  promptconfiguration?: string;
  promptconfigurationversion?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
