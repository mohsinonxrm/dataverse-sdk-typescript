import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_oclanguage entity type
 */
export interface msdyn_oclanguage {
  statecode?: number;
  componentidunique?: string;
  _owningbusinessunit_value?: string;
  _ownerid_value?: string;
  overwritetime?: string;
  importsequencenumber?: number;
  solutionid?: string;
  iscustomizable?: BooleanManagedProperty;
  _modifiedby_value?: string;
  overriddencreatedon?: string;
  createdon?: string;
  msdyn_localeid?: number;
  _owninguser_value?: string;
  ismanaged?: boolean;
  _createdby_value?: string;
  msdyn_localecode?: string;
  componentstate?: number;
  utcconversiontimezonecode?: number;
  msdyn_languagename?: string;
  _createdonbehalfby_value?: string;
  _modifiedonbehalfby_value?: string;
  modifiedon?: string;
  statuscode?: number;
  versionnumber?: number;
  timezoneruleversionnumber?: number;
  _owningteam_value?: string;
  msdyn_oclanguageid?: string;
}
