import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_intentsolution_mappingconfiguration entity type
 */
export interface msdyn_intentsolution_mappingconfiguration {
  versionnumber?: number;
  statecode?: number;
  msdyn_uniquename?: string;
  _createdby_value?: string;
  createdon?: string;
  _owningteam_value?: string;
  utcconversiontimezonecode?: number;
  timezoneruleversionnumber?: number;
  msdyn_name?: string;
  ismanaged?: boolean;
  _ownerid_value?: string;
  componentstate?: number;
  msdyn_solutionname?: string;
  msdyn_intentsolution_mappingconfigurationid?: string;
  overwritetime?: string;
  _owninguser_value?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  _owningbusinessunit_value?: string;
  msdyn_entityname?: string;
  overriddencreatedon?: string;
  componentidunique?: string;
  _msdyn_rulesetid_value?: string;
  solutionid?: string;
  statuscode?: number;
  _createdonbehalfby_value?: string;
  _modifiedonbehalfby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  _modifiedby_value?: string;
}
