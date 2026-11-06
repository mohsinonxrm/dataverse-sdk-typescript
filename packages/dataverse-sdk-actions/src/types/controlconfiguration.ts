import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * controlconfiguration entity type
 */
export interface controlconfiguration {
  _attribute_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  controlconfigurationid?: string;
  createdon?: string;
  entitylogicalname?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  metadatajson?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
