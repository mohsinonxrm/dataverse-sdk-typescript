import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_copilotorganizationworkload entity type
 */
export interface msdyn_copilotorganizationworkload {
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
  msdyn_columns?: string;
  msdyn_copilotorganizationworkloadid?: string;
  msdyn_fetchxml?: string;
  msdyn_name?: string;
  msdyn_prompt?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
