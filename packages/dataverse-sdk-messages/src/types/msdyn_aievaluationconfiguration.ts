import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aievaluationconfiguration entity type
 */
export interface msdyn_aievaluationconfiguration {
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
  msdyn_aievaluationconfigurationid?: string;
  msdyn_aiobjectid?: string;
  msdyn_aiobjecttype?: string;
  msdyn_configurationstate?: number;
  msdyn_description?: string;
  msdyn_evaluationcriteria?: string;
  msdyn_name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
