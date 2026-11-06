import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_cefinsighttestentityconfiguration entity type
 */
export interface msdyn_cefinsighttestentityconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
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
  msdyn_cefinsighttestentityconfigurationid?: string;
  msdyn_entitylogicalname?: string;
  msdyn_name?: string;
  msdyn_testentityid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
