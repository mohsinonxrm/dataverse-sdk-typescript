import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * powerpagecomponent entity type
 */
export interface powerpagecomponent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _powerpagesiteid_value?: string;
  _powerpagesitelanguageid_value?: string;
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
  powerpagecomponentid?: string;
  powerpagecomponenttype?: number;
  searchcontent?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
