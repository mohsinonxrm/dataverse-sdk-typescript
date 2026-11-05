import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_insightsstorevirtualentity entity type
 */
export interface msdyn_insightsstorevirtualentity {
  statecode?: number;
  versionnumber?: number;
  _organizationid_value?: string;
  componentidunique?: string;
  overwritetime?: string;
  importsequencenumber?: number;
  utcconversiontimezonecode?: number;
  modifiedon?: string;
  ismanaged?: boolean;
  _modifiedonbehalfby_value?: string;
  statuscode?: number;
  _extensionofrecordid_value?: string;
  timezoneruleversionnumber?: number;
  componentstate?: number;
  _createdonbehalfby_value?: string;
  overriddencreatedon?: string;
  name?: string;
  msdyn_insightsstorevirtualentityid?: string;
  solutionid?: string;
  iscustomizable?: BooleanManagedProperty;
  createdon?: string;
  _createdby_value?: string;
  _modifiedby_value?: string;
}
