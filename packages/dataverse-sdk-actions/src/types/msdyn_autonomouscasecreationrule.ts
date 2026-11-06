import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_autonomouscasecreationrule entity type
 */
export interface msdyn_autonomouscasecreationrule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_autonomouscasecreationruleid?: string;
  msdyn_conditionsxml?: string;
  msdyn_customapiname?: string;
  msdyn_order?: number;
  msdyn_predictorfields?: string;
  msdyn_regarding?: string;
  msdyn_rulename?: string;
  msdyn_uniquename?: string;
  msdyn_useCustomApi?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
