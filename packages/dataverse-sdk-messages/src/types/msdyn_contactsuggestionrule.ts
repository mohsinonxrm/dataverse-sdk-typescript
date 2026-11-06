import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_contactsuggestionrule entity type
 */
export interface msdyn_contactsuggestionrule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_contactsuggestionrulesetid_value?: string;
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
  msdyn_contactsuggestionruleid?: string;
  msdyn_customactioninputs?: string;
  msdyn_customactionname?: string;
  msdyn_descriptiontemplate?: string;
  msdyn_descriptiontemplateplaceholders?: string;
  msdyn_fetchxml?: string;
  msdyn_name?: string;
  msdyn_pathtotarget?: string;
  msdyn_rank?: number;
  msdyn_ruletype?: number;
  msdyn_top?: number;
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
