import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * solutioncomponentrelationshipconfiguration entity type
 */
export interface solutioncomponentrelationshipconfiguration {
  componentidunique: string;
  createdon: string;
  ismanaged: boolean;
  statecode: number;
  name: string;
  cascaderemovecomponents: boolean;
  statuscode: number;
  solutionid: string;
  overriddencreatedon: string;
  secondaryentitydependencytype: number;
  importsequencenumber: number;
  _entityrelationshipid_value: string;
  utcconversiontimezonecode: number;
  timezoneruleversionnumber: number;
  solutioncomponentrelationshipconfigurationid: string;
  primaryentitydependencytype: number;
  _createdby_value: string;
  _organizationid_value: string;
  iscustomizable: BooleanManagedProperty;
  componentstate: number;
  forceaddingmanagedrelatedcomponents: boolean;
  addrelatedcomponents: boolean;
  nomissingdependencyforapimanagedsolution: boolean;
  _modifiedonbehalfby_value: string;
  _createdonbehalfby_value: string;
  overwritetime: string;
  versionnumber: number;
  modifiedon: string;
  respectparentrootcomponentbehavior: boolean;
  _modifiedby_value: string;
}
