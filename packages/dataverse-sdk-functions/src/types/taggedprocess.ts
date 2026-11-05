import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * taggedprocess entity type
 */
export interface taggedprocess {
  overriddencreatedon?: string;
  solutionid?: string;
  _createdby_value?: string;
  _tag_value?: string;
  _owningbusinessunit_value?: string;
  componentidunique?: string;
  _modifiedby_value?: string;
  modifiedon?: string;
  versionnumber?: number;
  _process_value?: string;
  statecode?: number;
  timezoneruleversionnumber?: number;
  _owninguser_value?: string;
  createdon?: string;
  _modifiedonbehalfby_value?: string;
  utcconversiontimezonecode?: number;
  statuscode?: number;
  taggedprocessid?: string;
  ismanaged?: boolean;
  iscustomizable?: BooleanManagedProperty;
  _owningteam_value?: string;
  componentstate?: number;
  _ownerid_value?: string;
  _createdonbehalfby_value?: string;
  name?: string;
  importsequencenumber?: number;
  overwritetime?: string;
}
