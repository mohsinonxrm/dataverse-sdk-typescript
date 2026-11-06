import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * synapselinkschedule entity type
 */
export interface synapselinkschedule {
  statuscode?: number;
  synapselinkscheduleid?: string;
  overriddencreatedon?: string;
  recurrenceunit?: number;
  modifiedon?: string;
  importsequencenumber?: number;
  _organizationid_value?: string;
  ismanaged?: boolean;
  solutionid?: string;
  entityname?: string;
  componentidunique?: string;
  _modifiedonbehalfby_value?: string;
  uniquename?: string;
  _modifiedby_value?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  componentstate?: number;
  createdon?: string;
  recurrenceinterval?: number;
  overwritetime?: string;
  _profile_value?: string;
  iscustomizable?: BooleanManagedProperty;
  statecode?: number;
  starttime?: string;
  versionnumber?: number;
  _createdonbehalfby_value?: string;
  name?: string;
  _createdby_value?: string;
  type?: number;
}
