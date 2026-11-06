import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * federatedknowledgeentityconfiguration entity type
 */
export interface federatedknowledgeentityconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _federatedknowledgeconfiguration_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  entityconfig?: string;
  entityconfigversion?: string;
  federatedknowledgeentityconfigurationid?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
