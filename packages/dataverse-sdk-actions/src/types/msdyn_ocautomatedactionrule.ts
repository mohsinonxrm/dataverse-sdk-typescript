import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocautomatedactionrule entity type
 */
export interface msdyn_ocautomatedactionrule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_targetqueue_value?: string;
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
  msdyn_actiontype?: number;
  msdyn_contextvariablename?: string;
  msdyn_contextvariablevalue?: string;
  msdyn_eventfrequency?: number;
  msdyn_eventinterval?: number;
  msdyn_eventtype?: number;
  msdyn_name?: string;
  msdyn_ocautomatedactionruleid?: string;
  msdyn_operator?: number;
  msdyn_order?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
