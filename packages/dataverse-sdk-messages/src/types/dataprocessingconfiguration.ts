import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * dataprocessingconfiguration entity type
 */
export interface dataprocessingconfiguration {
  versionnumber?: number;
  statuscode?: number;
  _organizationid_value?: string;
  owningappid?: string;
  iscustomizable?: BooleanManagedProperty;
  moduleversion?: string;
  createdon?: string;
  externaldataprocessingconfigurationId?: string;
  modulename?: string;
  _createdonbehalfby_value?: string;
  overwritetime?: string;
  solutionid?: string;
  timezoneruleversionnumber?: number;
  name?: string;
  statecode?: number;
  componentstate?: number;
  importsequencenumber?: number;
  moduletype?: number;
  ismanaged?: boolean;
  _modifiedonbehalfby_value?: string;
  _createdby_value?: string;
  _modifiedby_value?: string;
  overriddencreatedon?: string;
  modifiedon?: string;
  utcconversiontimezonecode?: number;
  moduleconfigurationjson?: string;
  componentidunique?: string;
  dataprocessingconfigurationid?: string;
}
