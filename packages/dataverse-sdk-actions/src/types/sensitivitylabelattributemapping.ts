import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * sensitivitylabelattributemapping entity type
 */
export interface sensitivitylabelattributemapping {
  _attributeid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _entityid_value?: string;
  _labelid_value?: string;
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
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  sensitivitylabelattributemappingid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
