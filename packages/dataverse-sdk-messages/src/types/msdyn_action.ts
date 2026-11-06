import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_action entity type
 */
export interface msdyn_action {
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
  msdyn_actionid?: string;
  msdyn_actionname?: string;
  msdyn_conditions?: string;
  msdyn_conversationsampling?: number;
  msdyn_description?: string;
  msdyn_frequencytype?: number;
  msdyn_isactive?: boolean;
  msdyn_isoob?: boolean;
  msdyn_ispreconfigured?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
