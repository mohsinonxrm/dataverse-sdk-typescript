import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_productivityparameterdefinition entity type
 */
export interface msdyn_productivityparameterdefinition {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_defaultvalue?: string;
  msdyn_description?: string;
  msdyn_displayname?: string;
  msdyn_jsonobjectstructure?: string;
  msdyn_name?: string;
  msdyn_parametertype?: string;
  msdyn_productivityparameterdefinitionid?: string;
  msdyn_uniquename?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
