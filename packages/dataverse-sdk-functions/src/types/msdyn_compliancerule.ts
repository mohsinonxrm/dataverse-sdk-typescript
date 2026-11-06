import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_compliancerule entity type
 */
export interface msdyn_compliancerule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_nudgetemplateid_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_action?: number;
  msdyn_complianceruleid?: string;
  msdyn_description?: string;
  msdyn_rulename?: string;
  msdyn_scope?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
