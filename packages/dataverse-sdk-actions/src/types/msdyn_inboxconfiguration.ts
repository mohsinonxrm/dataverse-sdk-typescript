import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_inboxconfiguration entity type
 */
export interface msdyn_inboxconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_appconfigurationid_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  enablecrosspartition?: boolean;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_configuration?: string;
  msdyn_defaultsort?: string;
  msdyn_inboxconfigurationid?: string;
  msdyn_isdefault?: boolean;
  msdyn_isvisible?: boolean;
  msdyn_name?: string;
  msdyn_uniquename?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
