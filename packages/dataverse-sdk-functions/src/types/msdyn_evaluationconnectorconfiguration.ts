import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evaluationconnectorconfiguration entity type
 */
export interface msdyn_evaluationconnectorconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_evaluationthirdpartyconfiguration_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_connectionreferenceid?: string;
  msdyn_connectorid?: string;
  msdyn_evaluationconnectorconfigurationid?: string;
  msdyn_name?: string;
  msdyn_operationid?: string;
  msdyn_operationtype?: number;
  msdyn_pagingmetadata?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
