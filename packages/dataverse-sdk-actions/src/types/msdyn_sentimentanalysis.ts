import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_sentimentanalysis entity type
 */
export interface msdyn_sentimentanalysis {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_additionallanguagesenabled?: boolean;
  msdyn_agentthreshold?: number;
  msdyn_batchsentimentenabled?: boolean;
  msdyn_driversenabled?: boolean;
  msdyn_enabled?: boolean;
  msdyn_enableur?: boolean;
  msdyn_name?: string;
  msdyn_sentimentanalysisid?: string;
  msdyn_supervisorthreshold?: number;
  msdyn_supervisorthresholdalerttimeoutseconds?: number;
  msdyn_thresholdalertsenabled?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
