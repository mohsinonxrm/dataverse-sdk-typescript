import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_recurringsalesaction entity type
 */
export interface msdyn_recurringsalesaction {
  _createdonbehalfby_value?: string;
  msdyn_retrycount?: number;
  componentstate?: number;
  solutionid?: string;
  _createdby_value?: string;
  msdyn_recurringsalesactionid?: string;
  _organizationid_value?: string;
  importsequencenumber?: number;
  componentidunique?: string;
  msdyn_isrecurrencepatternschedule?: boolean;
  modifiedon?: string;
  _modifiedby_value?: string;
  overwritetime?: string;
  overriddencreatedon?: string;
  msdyn_workloadname?: string;
  timezoneruleversionnumber?: number;
  iscustomizable?: BooleanManagedProperty;
  msdyn_failurecount?: number;
  msdyn_schedule?: string;
  msdyn_payload?: string;
  msdyn_featurename?: number;
  versionnumber?: number;
  ismanaged?: boolean;
  statuscode?: number;
  statecode?: number;
  msdyn_triggername?: string;
  msdyn_startdate?: string;
  msdyn_recordstate?: number;
  _modifiedonbehalfby_value?: string;
  msdyn_lastexecutioninfo?: string;
  msdyn_customactionname?: string;
  utcconversiontimezonecode?: number;
  createdon?: string;
}
