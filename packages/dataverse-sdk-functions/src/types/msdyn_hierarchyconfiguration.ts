import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_hierarchyconfiguration entity type
 */
export interface msdyn_hierarchyconfiguration {
  _modifiedby_value: string;
  statecode: number;
  modifiedon: string;
  _owningteam_value: string;
  _owninguser_value: string;
  _modifiedonbehalfby_value: string;
  statuscode: number;
  importsequencenumber: number;
  overwritetime: string;
  componentidunique: string;
  createdon: string;
  msdyn_configuration: string;
  versionnumber: number;
  _createdonbehalfby_value: string;
  componentstate: number;
  solutionid: string;
  ismanaged: boolean;
  msdyn_hierarchyconfigurationid: string;
  _owningbusinessunit_value: string;
  utcconversiontimezonecode: number;
  overriddencreatedon: string;
  _createdby_value: string;
  iscustomizable: BooleanManagedProperty;
  msdyn_name: string;
  _ownerid_value: string;
  timezoneruleversionnumber: number;
}
