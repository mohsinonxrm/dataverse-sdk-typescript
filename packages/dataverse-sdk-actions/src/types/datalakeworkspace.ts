import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * datalakeworkspace entity type
 */
export interface datalakeworkspace {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  containerendpoint?: string;
  createdon?: string;
  datalakeworkspace_uniquename?: string;
  datalakeworkspaceid?: string;
  importsequencenumber?: number;
  iscustomercapacity?: boolean;
  iscustomizable?: BooleanManagedProperty;
  isdeepcopyenabled?: boolean;
  ismanaged?: boolean;
  isprivate?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  owningappid?: string;
  path?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  tenantid?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  whitelistedappid?: string;
}
