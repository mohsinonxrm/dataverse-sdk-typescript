import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * mcpresourcecontent entity type
 */
export interface mcpresourcecontent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _mcpresourceid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  blob?: string;
  blob_name?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  flags?: number;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  mcpresourcecontentid?: string;
  mimeType?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  text?: string;
  textblob?: string;
  textblob_name?: string;
  timezoneruleversionnumber?: number;
  uri?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
