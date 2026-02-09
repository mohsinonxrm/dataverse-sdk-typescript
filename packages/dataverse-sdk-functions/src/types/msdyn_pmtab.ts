import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmtab entity type
 */
export interface msdyn_pmtab {
  _owninguser_value: string;
  _modifiedonbehalfby_value: string;
  statecode: number;
  _ownerid_value: string;
  componentidunique: string;
  versionnumber: number;
  modifiedon: string;
  statuscode: number;
  msdyn_isprivate: boolean;
  msdyn_name: string;
  _owningteam_value: string;
  importsequencenumber: number;
  timezoneruleversionnumber: number;
  _owningbusinessunit_value: string;
  solutionid: string;
  msdyn_configuration: string;
  componentstate: number;
  _createdonbehalfby_value: string;
  msdyn_order: number;
  createdon: string;
  ismanaged: boolean;
  utcconversiontimezonecode: number;
  iscustomizable: BooleanManagedProperty;
  overwritetime: string;
  msdyn_pmtabid: string;
  overriddencreatedon: string;
  _createdby_value: string;
  _modifiedby_value: string;
  _msdyn_pmviewid_value: string;
}
