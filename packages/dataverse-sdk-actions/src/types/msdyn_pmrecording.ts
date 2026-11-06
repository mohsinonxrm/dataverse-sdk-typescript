import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmrecording entity type
 */
export interface msdyn_pmrecording {
  utcconversiontimezonecode?: number;
  componentstate?: number;
  ismanaged?: boolean;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  _ownerid_value?: string;
  _createdonbehalfby_value?: string;
  msdyn_publishingstatus?: number;
  statuscode?: number;
  _owningbusinessunit_value?: string;
  modifiedon?: string;
  _owningteam_value?: string;
  componentidunique?: string;
  _createdby_value?: string;
  msdyn_name?: string;
  _msdyn_sourceworkflow_value?: string;
  _owninguser_value?: string;
  _modifiedby_value?: string;
  msdyn_iterationid?: string;
  overriddencreatedon?: string;
  msdyn_lasterrors?: string;
  _modifiedonbehalfby_value?: string;
  timezoneruleversionnumber?: number;
  versionnumber?: number;
  msdyn_type?: number;
  _msdyn_parenttask_value?: string;
  overwritetime?: string;
  createdon?: string;
  solutionid?: string;
  statecode?: number;
  msdyn_pmrecordingid?: string;
  msdyn_normalizedrecording?: string;
}
