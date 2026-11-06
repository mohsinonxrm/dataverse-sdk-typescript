import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_inboxcardconfiguration entity type
 */
export interface msdyn_inboxcardconfiguration {
  createdon?: string;
  _modifiedonbehalfby_value?: string;
  utcconversiontimezonecode?: number;
  _organizationid_value?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  timezoneruleversionnumber?: number;
  statuscode?: number;
  _createdby_value?: string;
  componentidunique?: string;
  _modifiedby_value?: string;
  msdyn_requiredfields?: string;
  importsequencenumber?: number;
  msdyn_cardlayout?: string;
  msdyn_regardingentity?: string;
  overwritetime?: string;
  modifiedon?: string;
  solutionid?: string;
  msdyn_uniquename?: string;
  msdyn_name?: string;
  componentstate?: number;
  versionnumber?: number;
  _createdonbehalfby_value?: string;
  overriddencreatedon?: string;
  statecode?: number;
  msdyn_inboxcardconfigurationid?: string;
}
