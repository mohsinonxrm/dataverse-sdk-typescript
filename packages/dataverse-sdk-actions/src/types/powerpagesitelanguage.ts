import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * powerpagesitelanguage entity type
 */
export interface powerpagesitelanguage {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _powerpagesiteid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  content?: string;
  createdon?: string;
  displayname?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  languagecode?: string;
  lcid?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  powerpagesitelanguageid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
