import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * federatedknowledgeconfiguration entity type
 */
export interface federatedknowledgeconfiguration {
  _owningbusinessunit_value?: string;
  modifiedon?: string;
  versionnumber?: number;
  componentidunique?: string;
  statuscode?: number;
  overriddencreatedon?: string;
  _modifiedonbehalfby_value?: string;
  statecode?: number;
  _connectionreference_value?: string;
  componentstate?: number;
  statusdetail?: string;
  overwritetime?: string;
  _createdonbehalfby_value?: string;
  federatedknowledgeconfigurationid?: string;
  name?: string;
  _owninguser_value?: string;
  timezoneruleversionnumber?: number;
  solutionid?: string;
  _modifiedby_value?: string;
  knowledgeconfig?: string;
  _ownerid_value?: string;
  _createdby_value?: string;
  utcconversiontimezonecode?: number;
  createdon?: string;
  importsequencenumber?: number;
  uniquename?: string;
  iscustomizable?: BooleanManagedProperty;
  _owningteam_value?: string;
  ismanaged?: boolean;
  knowledgeconfigversion?: string;
}
