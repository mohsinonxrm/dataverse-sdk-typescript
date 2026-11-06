import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_entityattributepredictionrule entity type
 */
export interface msdyn_entityattributepredictionrule {
  msdyn_conditionsxml?: string;
  createdon?: string;
  _createdonbehalfby_value?: string;
  statecode?: number;
  _modifiedby_value?: string;
  msdyn_name?: string;
  iscustomizable?: BooleanManagedProperty;
  versionnumber?: number;
  solutionid?: string;
  _modifiedonbehalfby_value?: string;
  msdyn_regarding?: string;
  componentstate?: number;
  utcconversiontimezonecode?: number;
  _owningteam_value?: string;
  timezoneruleversionnumber?: number;
  _owningbusinessunit_value?: string;
  _createdby_value?: string;
  msdyn_isglobal?: boolean;
  msdyn_entityattributepredictionruleid?: string;
  ismanaged?: boolean;
  statuscode?: number;
  msdyn_order?: number;
  overriddencreatedon?: string;
  modifiedon?: string;
  msdyn_predictedfields?: string;
  componentidunique?: string;
  _ownerid_value?: string;
  importsequencenumber?: number;
  overwritetime?: string;
  _owninguser_value?: string;
}
