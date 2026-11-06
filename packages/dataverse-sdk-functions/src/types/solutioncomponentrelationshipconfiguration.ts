import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * solutioncomponentrelationshipconfiguration entity type
 */
export interface solutioncomponentrelationshipconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _entityrelationshipid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  addrelatedcomponents?: boolean;
  cascaderemovecomponents?: boolean;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  forceaddingmanagedrelatedcomponents?: boolean;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  nomissingdependencyforapimanagedsolution?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  primaryentitydependencytype?: number;
  respectparentrootcomponentbehavior?: boolean;
  secondaryentitydependencytype?: number;
  solutioncomponentrelationshipconfigurationid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
