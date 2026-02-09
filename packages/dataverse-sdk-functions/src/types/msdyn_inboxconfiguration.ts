import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_inboxconfiguration entity type
 */
export interface msdyn_inboxconfiguration {
  msdyn_isvisible: boolean;
  _organizationid_value: string;
  modifiedon: string;
  iscustomizable: BooleanManagedProperty;
  overwritetime: string;
  componentstate: number;
  _msdyn_appconfigurationid_value: string;
  msdyn_configuration: string;
  msdyn_uniquename: string;
  overriddencreatedon: string;
  _createdonbehalfby_value: string;
  statuscode: number;
  msdyn_defaultsort: string;
  importsequencenumber: number;
  timezoneruleversionnumber: number;
  versionnumber: number;
  msdyn_name: string;
  componentidunique: string;
  msdyn_inboxconfigurationid: string;
  utcconversiontimezonecode: number;
  _modifiedonbehalfby_value: string;
  solutionid: string;
  createdon: string;
  enablecrosspartition: boolean;
  _createdby_value: string;
  _modifiedby_value: string;
  ismanaged: boolean;
  msdyn_isdefault: boolean;
  statecode: number;
}
