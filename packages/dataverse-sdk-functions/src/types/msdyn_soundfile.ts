import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_soundfile entity type
 */
export interface msdyn_soundfile {
  versionnumber?: number;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  statuscode?: number;
  statecode?: number;
  msdyn_uploadsoundfile_name?: string;
  createdon?: string;
  overwritetime?: string;
  _modifiedonbehalfby_value?: string;
  solutionid?: string;
  overriddencreatedon?: string;
  importsequencenumber?: number;
  componentidunique?: string;
  _organizationid_value?: string;
  msdyn_uploadsoundfile?: string;
  ismanaged?: boolean;
  _modifiedby_value?: string;
  _createdonbehalfby_value?: string;
  msdyn_name?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  msdyn_soundfileid?: string;
  _createdby_value?: string;
  modifiedon?: string;
}
