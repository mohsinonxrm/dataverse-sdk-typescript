import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmsimulation entity type
 */
export interface msdyn_pmsimulation {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_pminferredtaskid_value?: string;
  _msdyn_pmviewid_value?: string;
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
  msdyn_description?: string;
  msdyn_end?: string;
  msdyn_generatelog?: boolean;
  msdyn_name?: string;
  msdyn_pmsimulationid?: string;
  msdyn_psesimulationid?: string;
  msdyn_result?: string;
  msdyn_setting?: string;
  msdyn_start?: string;
  msdyn_state?: number;
  msdyn_version?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
