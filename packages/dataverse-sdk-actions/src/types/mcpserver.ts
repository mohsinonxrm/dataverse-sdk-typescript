import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * mcpserver entity type
 */
export interface mcpserver {
  servertype?: number;
  timezoneruleversionnumber?: number;
  importsequencenumber?: number;
  icon_timestamp?: number;
  name?: string;
  _owningteam_value?: string;
  iscustomizable?: BooleanManagedProperty;
  modifiedon?: string;
  mcpserverid?: string;
  icon_url?: string;
  description?: string;
  audience?: string;
  displayname?: string;
  utcconversiontimezonecode?: number;
  ismanaged?: boolean;
  overwritetime?: string;
  configuration?: string;
  isremote?: boolean;
  _owninguser_value?: string;
  instructions?: string;
  scope?: string;
  componentidunique?: string;
  _owningbusinessunit_value?: string;
  _createdby_value?: string;
  relativepath?: string;
  solutionid?: string;
  versionnumber?: number;
  statecode?: number;
  _ownerid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  componentstate?: number;
  _createdonbehalfby_value?: string;
  statuscode?: number;
  iconid?: string;
  overriddencreatedon?: string;
  createdon?: string;
  icon?: string;
}
