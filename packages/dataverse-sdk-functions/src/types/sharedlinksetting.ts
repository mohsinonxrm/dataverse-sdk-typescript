import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * sharedlinksetting entity type
 */
export interface sharedlinksetting {
  sharedlinksettingid: string;
  _modifiedonbehalfby_value: string;
  componentstate: number;
  _modifiedby_value: string;
  _createdby_value: string;
  importsequencenumber: number;
  utcconversiontimezonecode: number;
  overriddencreatedon: string;
  componentidunique: string;
  ismanaged: boolean;
  _extensionofrecordid_value: string;
  statecode: number;
  createdon: string;
  isenabledforsharedlinkcreation: boolean;
  solutionid: string;
  iscustomizable: BooleanManagedProperty;
  _createdonbehalfby_value: string;
  name: string;
  statuscode: number;
  _organizationid_value: string;
  timezoneruleversionnumber: number;
  versionnumber: number;
  overwritetime: string;
  modifiedon: string;
}
