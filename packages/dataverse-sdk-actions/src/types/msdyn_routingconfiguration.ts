import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_routingconfiguration entity type
 */
export interface msdyn_routingconfiguration {
  _owningteam_value: string;
  _modifiedby_value: string;
  msdyn_uniquename: string;
  versionnumber: number;
  solutionid: string;
  timezoneruleversionnumber: number;
  componentstate: number;
  statuscode: number;
  _ownerid_value: string;
  _createdonbehalfby_value: string;
  utcconversiontimezonecode: number;
  statecode: number;
  _owningbusinessunit_value: string;
  importsequencenumber: number;
  overwritetime: string;
  _modifiedonbehalfby_value: string;
  overriddencreatedon: string;
  _owninguser_value: string;
  modifiedon: string;
  _msdyn_liveworkstreamid_value: string;
  componentidunique: string;
  ismanaged: boolean;
  msdyn_name: string;
  iscustomizable: BooleanManagedProperty;
  msdyn_routingconfigurationid: string;
  _createdby_value: string;
  msdyn_isactiveconfiguration: boolean;
  createdon: string;
}
