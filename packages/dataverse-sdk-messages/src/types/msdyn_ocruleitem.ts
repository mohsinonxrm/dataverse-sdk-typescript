import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocruleitem entity type
 */
export interface msdyn_ocruleitem {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_cdsqueueassignid_value?: string;
  _msdyn_liveworkstream_value?: string;
  _msdyn_queueassignid_value?: string;
  _msdyn_userassignid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_action?: string;
  msdyn_assignedto?: number;
  msdyn_condition?: string;
  msdyn_expression?: string;
  msdyn_name?: string;
  msdyn_ocruleitemid?: string;
  msdyn_priority?: string;
  msdyn_rulejson?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
