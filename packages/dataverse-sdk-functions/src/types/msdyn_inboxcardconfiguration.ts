import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_inboxcardconfiguration entity type
 */
export interface msdyn_inboxcardconfiguration {
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
  msdyn_cardlayout?: string;
  msdyn_inboxcardconfigurationid?: string;
  msdyn_name?: string;
  msdyn_regardingentity?: string;
  msdyn_requiredfields?: string;
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
