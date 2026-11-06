import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * mcpprompt entity type
 */
export interface mcpprompt {
  Meta?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _mcpserverid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  arguments?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  flags?: number;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  mcppromptid?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  template?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
