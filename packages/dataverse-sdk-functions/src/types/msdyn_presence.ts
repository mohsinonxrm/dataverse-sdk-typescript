import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_presence entity type
 */
export interface msdyn_presence {
  overwritetime?: string;
  modifiedon?: string;
  solutionid?: string;
  componentidunique?: string;
  _modifiedby_value?: string;
  _createdby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  importsequencenumber?: number;
  msdyn_name?: string;
  ismanaged?: boolean;
  _organizationid_value?: string;
  versionnumber?: number;
  overriddencreatedon?: string;
  msdyn_description?: string;
  msdyn_presenceid?: string;
  _modifiedonbehalfby_value?: string;
  msdyn_presencestatustext?: string;
  _createdonbehalfby_value?: string;
  statuscode?: number;
  componentstate?: number;
  msdyn_basepresencestatus?: number;
  createdon?: string;
  utcconversiontimezonecode?: number;
  msdyn_canuserset?: boolean;
  statecode?: number;
  timezoneruleversionnumber?: number;
}
