import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_rulesetdependencymapping entity type
 */
export interface msdyn_rulesetdependencymapping {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_referencedpolymorphicentityid_value?: string;
  _msdyn_referencingrulesetid_value?: string;
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
  msdyn_name?: string;
  msdyn_referencedpolymorphiclogicalname?: string;
  msdyn_referencingruleid?: string;
  msdyn_referencingrulename?: string;
  msdyn_rulesetdependencymappingid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
