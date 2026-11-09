import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * duplicaterule entity type
 */
export interface duplicaterule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  baseentitymatchcodetable?: string;
  baseentityname?: string;
  baseentitytypecode?: number;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  duplicateruleid?: string;
  excludeinactiverecords?: boolean;
  iscasesensitive?: boolean;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  matchingentitymatchcodetable?: string;
  matchingentityname?: string;
  matchingentitytypecode?: number;
  modifiedon?: string;
  name?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
}
