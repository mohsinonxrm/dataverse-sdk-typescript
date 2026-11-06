import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aiconnectormapping entity type
 */
export interface msdyn_aiconnectormapping {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
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
  msdyn_aiconnectormappingid?: string;
  msdyn_connectionid?: string;
  msdyn_connectorid?: string;
  msdyn_operationid?: string;
  msdyn_type?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
