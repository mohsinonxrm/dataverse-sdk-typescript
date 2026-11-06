import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * savingrule entity type
 */
export interface savingrule {
  statuscode?: number;
  _owninguser_value?: string;
  iscustomizable?: BooleanManagedProperty;
  modifiedon?: string;
  startedon?: string;
  savingruleid?: string;
  endedon?: string;
  versionnumber?: number;
  componentstate?: number;
  name?: string;
  _modifiedby_value?: string;
  _owningbusinessunit_value?: string;
  _workflowid_value?: string;
  _createdby_value?: string;
  timezoneruleversionnumber?: number;
  _modifiedonbehalfby_value?: string;
  solutionid?: string;
  overwritetime?: string;
  createdon?: string;
  componentidunique?: string;
  ruledata?: string;
  importsequencenumber?: number;
  ismanaged?: boolean;
  utcconversiontimezonecode?: number;
  _workqueueid_value?: string;
  overriddencreatedon?: string;
  _owningteam_value?: string;
  _ownerid_value?: string;
  _createdonbehalfby_value?: string;
  statecode?: number;
}
