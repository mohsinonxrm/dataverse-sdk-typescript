import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_panetabconfiguration entity type
 */
export interface msdyn_panetabconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_productivitypaneid_value?: string;
  _msdyn_toolid_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_iconpath?: string;
  msdyn_isenabled?: boolean;
  msdyn_name?: string;
  msdyn_order?: number;
  msdyn_panetabconfigurationid?: string;
  msdyn_tooltip?: string;
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
