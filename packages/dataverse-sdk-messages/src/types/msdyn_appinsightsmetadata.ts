import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_appinsightsmetadata entity type
 */
export interface msdyn_appinsightsmetadata {
  ismanaged?: boolean;
  overwritetime?: string;
  msdyn_typename?: string;
  utcconversiontimezonecode?: number;
  iscustomizable?: BooleanManagedProperty;
  _modifiedby_value?: string;
  msdyn_appinsightsmetadataid?: string;
  msdyn_payload?: string;
  uniquename?: string;
  _createdby_value?: string;
  _modifiedonbehalfby_value?: string;
  statuscode?: number;
  componentidunique?: string;
  importsequencenumber?: number;
  overriddencreatedon?: string;
  componentstate?: number;
  _organizationid_value?: string;
  statecode?: number;
  solutionid?: string;
  createdon?: string;
  modifiedon?: string;
  _createdonbehalfby_value?: string;
  msdyn_partitionkey?: string;
  timezoneruleversionnumber?: number;
  msdyn_payloadserialization?: string;
  name?: string;
  versionnumber?: number;
}
