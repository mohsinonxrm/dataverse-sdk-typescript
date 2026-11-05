import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * sharepointmanagedidentity entity type
 */
export interface sharepointmanagedidentity {
  statuscode?: number;
  iscustomizable?: BooleanManagedProperty;
  overriddencreatedon?: string;
  sharepointmanagedidentityid?: string;
  _managedidentityid_value?: string;
  versionnumber?: number;
  statecode?: number;
  ismanaged?: boolean;
  componentidunique?: string;
  _modifiedonbehalfby_value?: string;
  timezoneruleversionnumber?: number;
  name?: string;
  _modifiedby_value?: string;
  solutionid?: string;
  componentstate?: number;
  _organizationid_value?: string;
  utcconversiontimezonecode?: number;
  _createdonbehalfby_value?: string;
  modifiedon?: string;
  overwritetime?: string;
  importsequencenumber?: number;
  uniquename?: string;
  _createdby_value?: string;
  createdon?: string;
}
