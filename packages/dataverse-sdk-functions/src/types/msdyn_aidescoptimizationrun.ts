import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aidescoptimizationrun entity type
 */
export interface msdyn_aidescoptimizationrun {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
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
  msdyn_aidescoptimizationrunid?: string;
  msdyn_bestroundjson?: string;
  msdyn_bestroundnumber?: number;
  msdyn_completedon?: string;
  msdyn_correlationid?: string;
  msdyn_currentiteration?: number;
  msdyn_entitylogicalname?: string;
  msdyn_errordetails?: string;
  msdyn_fieldlogicalname?: string;
  msdyn_initialsimulationrunid?: string;
  msdyn_iterateonbest?: boolean;
  msdyn_language?: string;
  msdyn_maxrounds?: number;
  msdyn_name?: string;
  msdyn_processstatusmsg?: string;
  msdyn_progresslog?: string;
  msdyn_roundresultsjson?: string;
  msdyn_startedon?: string;
  msdyn_status?: number;
  msdyn_targetaccuracy?: number;
  msdyn_targetattributename?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
