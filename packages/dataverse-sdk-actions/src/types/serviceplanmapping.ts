import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * serviceplanmapping entity type
 */
export interface serviceplanmapping {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _customapi_value?: string;
  _entity_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _sdkmessage_value?: string;
  _serviceplan_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  featurecontrol?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  serviceplanmappingid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
