import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_inboxentityconfig entity type
 */
export interface msdyn_inboxentityconfig {
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  _createdby_value?: string;
  msdyn_name?: string;
  msdyn_uniquename?: string;
  _modifiedonbehalfby_value?: string;
  _modifiedby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  versionnumber?: number;
  componentidunique?: string;
  _organizationid_value?: string;
  statuscode?: number;
  overriddencreatedon?: string;
  statecode?: number;
  ismanaged?: boolean;
  overwritetime?: string;
  modifiedon?: string;
  solutionid?: string;
  _createdonbehalfby_value?: string;
  msdyn_inboxentityconfigid?: string;
  importsequencenumber?: number;
  componentstate?: number;
  _msdyn_inboxcardconfigurationid_value?: string;
  createdon?: string;
  _msdyn_entitytypeid_value?: string;
}
