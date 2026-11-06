import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * entityrecordfilter entity type
 */
export interface entityrecordfilter {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _recordfilterid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  entityrecordfilterid?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  objecttypecode?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
