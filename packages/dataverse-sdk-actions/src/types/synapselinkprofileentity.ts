import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * synapselinkprofileentity entity type
 */
export interface synapselinkprofileentity {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _profile_value?: string;
  appendonlymode?: boolean;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  enabled?: boolean;
  entityname?: string;
  entitysource?: number;
  entitytype?: number;
  extendedproperties?: string;
  generateparquet?: boolean;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  partitionstrategy?: number;
  recordcountperblock?: number;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  synapselinkprofileentityid?: string;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
