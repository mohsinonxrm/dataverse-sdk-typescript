import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * mcpresource entity type
 */
export interface mcpresource {
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
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  flags?: number;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  mcpresourceid?: string;
  mimeType?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  size?: number;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  title?: string;
  uri?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
