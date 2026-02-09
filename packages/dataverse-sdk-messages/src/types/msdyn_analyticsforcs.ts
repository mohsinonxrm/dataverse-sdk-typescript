import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_analyticsforcs entity type
 */
export interface msdyn_analyticsforcs {
  solutionid: string;
  _owninguser_value: string;
  timezoneruleversionnumber: number;
  overwritetime: string;
  versionnumber: number;
  modifiedon: string;
  msdyn_name: string;
  iscustomizable: BooleanManagedProperty;
  statuscode: number;
  msdyn_analyticsforcsid: string;
  ismanaged: boolean;
  _owningteam_value: string;
  importsequencenumber: number;
  _modifiedby_value: string;
  _createdby_value: string;
  createdon: string;
  _createdonbehalfby_value: string;
  _ownerid_value: string;
  componentidunique: string;
  componentstate: number;
  statecode: number;
  utcconversiontimezonecode: number;
  _modifiedonbehalfby_value: string;
  _owningbusinessunit_value: string;
  overriddencreatedon: string;
}
