import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_entityattributepredictionrule entity type
 */
export interface msdyn_entityattributepredictionrule {
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
  msdyn_conditionsxml?: string;
  msdyn_entityattributepredictionruleid?: string;
  msdyn_isglobal?: boolean;
  msdyn_name?: string;
  msdyn_order?: number;
  msdyn_predictedfields?: string;
  msdyn_regarding?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
