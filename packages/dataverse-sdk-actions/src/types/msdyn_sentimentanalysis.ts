import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_sentimentanalysis entity type
 */
export interface msdyn_sentimentanalysis {
  versionnumber?: number;
  msdyn_thresholdalertsenabled?: boolean;
  statuscode?: number;
  msdyn_agentthreshold?: number;
  componentidunique?: string;
  statecode?: number;
  modifiedon?: string;
  importsequencenumber?: number;
  solutionid?: string;
  componentstate?: number;
  msdyn_enabled?: boolean;
  iscustomizable?: BooleanManagedProperty;
  msdyn_enableur?: boolean;
  msdyn_name?: string;
  msdyn_sentimentanalysisid?: string;
  msdyn_additionallanguagesenabled?: boolean;
  _createdby_value?: string;
  _modifiedby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedonbehalfby_value?: string;
  overriddencreatedon?: string;
  msdyn_driversenabled?: boolean;
  msdyn_supervisorthresholdalerttimeoutseconds?: number;
  overwritetime?: string;
  timezoneruleversionnumber?: number;
  msdyn_supervisorthreshold?: number;
  utcconversiontimezonecode?: number;
  ismanaged?: boolean;
  createdon?: string;
  _organizationid_value?: string;
}
