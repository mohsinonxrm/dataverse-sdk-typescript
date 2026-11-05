import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocencryptedmessagesetting entity type
 */
export interface msdyn_ocencryptedmessagesetting {
  modifiedon?: string;
  overwritetime?: string;
  _owningteam_value?: string;
  componentidunique?: string;
  msdyn_publickeyid?: string;
  importsequencenumber?: number;
  versionnumber?: number;
  ismanaged?: boolean;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  timezoneruleversionnumber?: number;
  msdyn_ocencryptedmessagesettingid?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  _createdonbehalfby_value?: string;
  _owningbusinessunit_value?: string;
  _owninguser_value?: string;
  overriddencreatedon?: string;
  statuscode?: number;
  statecode?: number;
  _createdby_value?: string;
  utcconversiontimezonecode?: number;
  solutionid?: string;
  msdyn_name?: string;
  msdyn_publickeyurl?: string;
  createdon?: string;
}
