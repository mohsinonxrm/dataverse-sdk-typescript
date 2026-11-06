import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * powerpagessourcefile entity type
 */
export interface powerpagessourcefile {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _powerpagesiteid_value?: string;
  codetype?: number;
  componentidunique?: string;
  componentstate?: number;
  content?: string;
  createdon?: string;
  filecontent?: string;
  filecontent_name?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  powerpagessourcefileid?: string;
  searchcontent?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
