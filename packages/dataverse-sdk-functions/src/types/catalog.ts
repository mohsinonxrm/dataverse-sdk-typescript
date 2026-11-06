import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * catalog entity type
 */
export interface catalog {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _parentcatalogid_value?: string;
  catalogid?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  displayname?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
