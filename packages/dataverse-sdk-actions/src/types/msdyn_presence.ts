import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_presence entity type
 */
export interface msdyn_presence {
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
  msdyn_basepresencestatus?: number;
  msdyn_canservicerepresentativeset?: boolean;
  msdyn_cansupervisorset?: boolean;
  msdyn_canuserset?: boolean;
  msdyn_description?: string;
  msdyn_name?: string;
  msdyn_presenceid?: string;
  msdyn_presencestatustext?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
