import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * sensitivitylabelattributemapping entity type
 */
export interface sensitivitylabelattributemapping {
  _modifiedby_value?: string;
  _createdby_value?: string;
  utcconversiontimezonecode?: number;
  _entityid_value?: string;
  ismanaged?: boolean;
  componentidunique?: string;
  _organizationid_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedonbehalfby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  modifiedon?: string;
  overriddencreatedon?: string;
  _attributeid_value?: string;
  importsequencenumber?: number;
  sensitivitylabelattributemappingid?: string;
  name?: string;
  versionnumber?: number;
  _labelid_value?: string;
  createdon?: string;
  statecode?: number;
  solutionid?: string;
  overwritetime?: string;
  componentstate?: number;
  timezoneruleversionnumber?: number;
  statuscode?: number;
}
