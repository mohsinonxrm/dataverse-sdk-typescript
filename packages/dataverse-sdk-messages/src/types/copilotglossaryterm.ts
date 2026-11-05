import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * copilotglossaryterm entity type
 */
export interface copilotglossaryterm {
  statuscode?: number;
  createdon?: string;
  _createdonbehalfby_value?: string;
  modifiedon?: string;
  iscustomizable?: BooleanManagedProperty;
  statecode?: number;
  ismanaged?: boolean;
  componentstate?: number;
  _ownerid_value?: string;
  _createdby_value?: string;
  _skill_value?: string;
  description?: string;
  _owningbusinessunit_value?: string;
  _modifiedonbehalfby_value?: string;
  solutionid?: string;
  overwritetime?: string;
  term?: string;
  componentidunique?: string;
  overriddencreatedon?: string;
  copilotglossarytermid?: string;
  _modifiedby_value?: string;
  name?: string;
  versionnumber?: number;
  importsequencenumber?: number;
  utcconversiontimezonecode?: number;
  _owningteam_value?: string;
  _owninguser_value?: string;
  timezoneruleversionnumber?: number;
}
