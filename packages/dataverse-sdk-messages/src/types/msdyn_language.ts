import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_language entity type
 */
export interface msdyn_language {
  _modifiedby_value?: string;
  _ownerid_value?: string;
  createdon?: string;
  msdyn_name?: string;
  msdyn_languagename?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  _owningteam_value?: string;
  versionnumber?: number;
  _owninguser_value?: string;
  _createdby_value?: string;
  _owningbusinessunit_value?: string;
  overriddencreatedon?: string;
  statuscode?: number;
  overwritetime?: string;
  msdyn_languageid?: string;
  timezoneruleversionnumber?: number;
  _msdyn_parentlanguageid_value?: string;
  msdyn_localeid?: number;
  utcconversiontimezonecode?: number;
  _createdonbehalfby_value?: string;
  importsequencenumber?: number;
  _modifiedonbehalfby_value?: string;
  componentidunique?: string;
  statecode?: number;
  msdyn_localecode?: string;
  solutionid?: string;
  modifiedon?: string;
  componentstate?: number;
}
