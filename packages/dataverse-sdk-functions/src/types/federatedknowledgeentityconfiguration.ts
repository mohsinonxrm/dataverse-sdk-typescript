import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * federatedknowledgeentityconfiguration entity type
 */
export interface federatedknowledgeentityconfiguration {
  name: string;
  _owningteam_value: string;
  componentidunique: string;
  overwritetime: string;
  utcconversiontimezonecode: number;
  _modifiedonbehalfby_value: string;
  iscustomizable: BooleanManagedProperty;
  statuscode: number;
  _owninguser_value: string;
  entityconfig: string;
  componentstate: number;
  importsequencenumber: number;
  _createdonbehalfby_value: string;
  ismanaged: boolean;
  solutionid: string;
  createdon: string;
  _ownerid_value: string;
  _createdby_value: string;
  entityconfigversion: string;
  modifiedon: string;
  federatedknowledgeentityconfigurationid: string;
  statecode: number;
  _modifiedby_value: string;
  versionnumber: number;
  overriddencreatedon: string;
  _owningbusinessunit_value: string;
  timezoneruleversionnumber: number;
  _federatedknowledgeconfiguration_value: string;
}
