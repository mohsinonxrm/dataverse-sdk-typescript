import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * catalog entity type
 */
export interface catalog {
  statuscode?: number;
  _parentcatalogid_value?: string;
  _createdby_value?: string;
  overwritetime?: string;
  componentidunique?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  catalogid?: string;
  statecode?: number;
  _modifiedonbehalfby_value?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  timezoneruleversionnumber?: number;
  componentstate?: number;
  description?: string;
  _modifiedby_value?: string;
  solutionid?: string;
  ismanaged?: boolean;
  modifiedon?: string;
  uniquename?: string;
  name?: string;
  displayname?: string;
  _createdonbehalfby_value?: string;
  overriddencreatedon?: string;
}
