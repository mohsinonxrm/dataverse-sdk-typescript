import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_organizationprompt entity type
 */
export interface msdyn_organizationprompt {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_skill_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  mdyn_orgpromptfiltervalue?: string;
  modifiedon?: string;
  msdyn_appliesonlytoworkload?: boolean;
  msdyn_clientactionresources?: string;
  msdyn_clienteventdata?: string;
  msdyn_entitydynamicfilter?: string;
  msdyn_entitydynamicfiltervalues?: string;
  msdyn_entityname?: string;
  msdyn_name?: string;
  msdyn_organizationpromptfiltervalue?: string;
  msdyn_organizationpromptid?: string;
  msdyn_prompt?: string;
  msdyn_promptalias?: string;
  msdyn_promptinstruction?: string;
  msdyn_promptscope?: number;
  msdyn_showinguide?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
