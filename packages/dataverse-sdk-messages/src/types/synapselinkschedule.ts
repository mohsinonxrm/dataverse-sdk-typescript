import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * synapselinkschedule entity type
 */
export interface synapselinkschedule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _profile_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  entityname?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  recurrenceinterval?: number;
  recurrenceunit?: number;
  solutionid?: string;
  starttime?: string;
  statecode?: number;
  statuscode?: number;
  synapselinkscheduleid?: string;
  timezoneruleversionnumber?: number;
  type?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
