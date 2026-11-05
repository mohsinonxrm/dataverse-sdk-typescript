import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_organizationprompt entity type
 */
export interface msdyn_organizationprompt {
  statuscode?: number;
  utcconversiontimezonecode?: number;
  msdyn_promptscope?: number;
  msdyn_organizationpromptfiltervalue?: string;
  overwritetime?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  mdyn_orgpromptfiltervalue?: string;
  createdon?: string;
  _createdby_value?: string;
  msdyn_promptalias?: string;
  msdyn_promptinstruction?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_organizationpromptid?: string;
  _msdyn_skill_value?: string;
  timezoneruleversionnumber?: number;
  msdyn_entityname?: string;
  versionnumber?: number;
  msdyn_clienteventdata?: string;
  solutionid?: string;
  iscustomizable?: BooleanManagedProperty;
  statecode?: number;
  componentidunique?: string;
  componentstate?: number;
  ismanaged?: boolean;
  msdyn_prompt?: string;
  overriddencreatedon?: string;
  msdyn_showinguide?: boolean;
  msdyn_name?: string;
  _createdonbehalfby_value?: string;
  _organizationid_value?: string;
}
