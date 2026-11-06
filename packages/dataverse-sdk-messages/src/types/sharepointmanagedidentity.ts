import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * sharepointmanagedidentity entity type
 */
export interface sharepointmanagedidentity {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _managedidentityid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  sharepointmanagedidentityid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
