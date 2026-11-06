import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * powerbimashupparameter entity type
 */
export interface powerbimashupparameter {
  _owningbusinessunit_value?: string;
  importsequencenumber?: number;
  _modifiedby_value?: string;
  componentidunique?: string;
  _createdby_value?: string;
  _modifiedonbehalfby_value?: string;
  utcconversiontimezonecode?: number;
  ismanaged?: boolean;
  _createdonbehalfby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  _datasetid_value?: string;
  componentstate?: number;
  parametervaluesource?: number;
  overriddencreatedon?: string;
  statecode?: number;
  timezoneruleversionnumber?: number;
  parametername?: string;
  isnotrequired?: boolean;
  solutionid?: string;
  uniquename?: string;
  _owningteam_value?: string;
  modifiedon?: string;
  overwritetime?: string;
  parameterliteralvalue?: string;
  versionnumber?: number;
  _owninguser_value?: string;
  statuscode?: number;
  _ownerid_value?: string;
  powerbimashupparameterid?: string;
  _environmentvariableid_value?: string;
  name?: string;
  createdon?: string;
}
