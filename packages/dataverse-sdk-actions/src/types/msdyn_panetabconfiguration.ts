import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_panetabconfiguration entity type
 */
export interface msdyn_panetabconfiguration {
  _modifiedonbehalfby_value: string;
  solutionid: string;
  modifiedon: string;
  msdyn_panetabconfigurationid: string;
  msdyn_isenabled: boolean;
  ismanaged: boolean;
  overwritetime: string;
  _modifiedby_value: string;
  componentstate: number;
  msdyn_order: number;
  iscustomizable: BooleanManagedProperty;
  msdyn_iconpath: string;
  msdyn_name: string;
  statuscode: number;
  msdyn_uniquename: string;
  createdon: string;
  _organizationid_value: string;
  importsequencenumber: number;
  _msdyn_toolid_value: string;
  _createdby_value: string;
  msdyn_tooltip: string;
  timezoneruleversionnumber: number;
  _msdyn_productivitypaneid_value: string;
  overriddencreatedon: string;
  versionnumber: number;
  _createdonbehalfby_value: string;
  statecode: number;
  componentidunique: string;
  utcconversiontimezonecode: number;
}
