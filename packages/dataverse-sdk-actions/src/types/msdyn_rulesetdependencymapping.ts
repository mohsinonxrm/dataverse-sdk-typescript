import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_rulesetdependencymapping entity type
 */
export interface msdyn_rulesetdependencymapping {
  _createdby_value?: string;
  overriddencreatedon?: string;
  modifiedon?: string;
  msdyn_referencedpolymorphiclogicalname?: string;
  msdyn_rulesetdependencymappingid?: string;
  _owningteam_value?: string;
  solutionid?: string;
  _ownerid_value?: string;
  statecode?: number;
  msdyn_referencingruleid?: string;
  iscustomizable?: BooleanManagedProperty;
  componentstate?: number;
  importsequencenumber?: number;
  msdyn_referencingrulename?: string;
  statuscode?: number;
  _modifiedby_value?: string;
  _msdyn_referencedpolymorphicentityid_value?: string;
  _modifiedonbehalfby_value?: string;
  createdon?: string;
  ismanaged?: boolean;
  timezoneruleversionnumber?: number;
  _owningbusinessunit_value?: string;
  utcconversiontimezonecode?: number;
  _owninguser_value?: string;
  _createdonbehalfby_value?: string;
  versionnumber?: number;
  componentidunique?: string;
  msdyn_name?: string;
  _msdyn_referencingrulesetid_value?: string;
  overwritetime?: string;
}
