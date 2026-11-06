import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_swarmtemplate entity type
 */
export interface msdyn_swarmtemplate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_entitytypeid_value?: string;
  _msdyn_skillattachmentrulesetid_value?: string;
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
  msdyn_isdefault?: boolean;
  msdyn_name?: string;
  msdyn_numberofexpertsperskill?: number;
  msdyn_swarmguide?: string;
  msdyn_swarmtemplateid?: string;
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
