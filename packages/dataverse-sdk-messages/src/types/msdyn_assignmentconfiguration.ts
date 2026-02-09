import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_assignmentconfiguration entity type
 */
export interface msdyn_assignmentconfiguration {
  ismanaged: boolean;
  _modifiedonbehalfby_value: string;
  overriddencreatedon: string;
  _owningteam_value: string;
  _owninguser_value: string;
  msdyn_uniquename: string;
  msdyn_name: string;
  modifiedon: string;
  statuscode: number;
  componentidunique: string;
  versionnumber: number;
  iscustomizable: BooleanManagedProperty;
  statecode: number;
  timezoneruleversionnumber: number;
  _ownerid_value: string;
  importsequencenumber: number;
  createdon: string;
  componentstate: number;
  msdyn_description: string;
  overwritetime: string;
  _modifiedby_value: string;
  msdyn_assignmentconfigurationid: string;
  _createdonbehalfby_value: string;
  _owningbusinessunit_value: string;
  _msdyn_queueid_value: string;
  msdyn_isactiveconfiguration: boolean;
  _createdby_value: string;
  utcconversiontimezonecode: number;
  solutionid: string;
}
