import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * dataprocessingconfiguration entity type
 */
export interface dataprocessingconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  dataprocessingconfigurationid?: string;
  externaldataprocessingconfigurationId?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  moduleconfigurationjson?: string;
  modulename?: string;
  moduletype?: number;
  moduleversion?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  owningappid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
