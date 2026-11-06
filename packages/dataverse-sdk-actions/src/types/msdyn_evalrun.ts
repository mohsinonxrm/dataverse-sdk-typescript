import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evalrun entity type
 */
export interface msdyn_evalrun {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_evaldatasetid_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_completedon?: string;
  msdyn_evalrunid?: string;
  msdyn_name?: string;
  msdyn_passedassertioncount?: number;
  msdyn_runstatus?: number;
  msdyn_startedon?: string;
  msdyn_totalassertioncount?: number;
  msdyn_totalpromptcount?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
