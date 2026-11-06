import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_adaptivecardconfiguration entity type
 */
export interface msdyn_adaptivecardconfiguration {
  msdyn_name?: string;
  componentstate?: number;
  msdyn_uniquename?: string;
  modifiedon?: string;
  createdon?: string;
  solutionid?: string;
  _createdby_value?: string;
  _modifiedby_value?: string;
  msdyn_adaptivecardconfigurationid?: string;
  statuscode?: number;
  _createdonbehalfby_value?: string;
  statecode?: number;
  iscustomizable?: BooleanManagedProperty;
  _modifiedonbehalfby_value?: string;
  versionnumber?: number;
  utcconversiontimezonecode?: number;
  componentidunique?: string;
  msdyn_adaptivecardtemplate?: string;
  timezoneruleversionnumber?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  importsequencenumber?: number;
  ismanaged?: boolean;
  _organizationid_value?: string;
}
