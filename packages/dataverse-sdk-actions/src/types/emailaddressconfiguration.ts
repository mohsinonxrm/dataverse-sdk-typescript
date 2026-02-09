import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * emailaddressconfiguration entity type
 */
export interface emailaddressconfiguration {
  modifiedon: string;
  _modifiedby_value: string;
  overwritetime: string;
  utcconversiontimezonecode: number;
  statuscode: number;
  _createdby_value: string;
  iscustomizable: BooleanManagedProperty;
  ismanaged: boolean;
  name: string;
  _createdonbehalfby_value: string;
  importsequencenumber: number;
  createdon: string;
  _attributeid_value: string;
  solutionid: string;
  versionnumber: number;
  overriddencreatedon: string;
  _modifiedonbehalfby_value: string;
  donotresolve: boolean;
  timezoneruleversionnumber: number;
  _organizationid_value: string;
  statecode: number;
  emailaddressconfigurationid: string;
  componentidunique: string;
  _entityid_value: string;
  componentstate: number;
}
