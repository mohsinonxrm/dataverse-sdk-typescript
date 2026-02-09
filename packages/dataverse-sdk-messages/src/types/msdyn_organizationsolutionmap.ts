import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_organizationsolutionmap entity type
 */
export interface msdyn_organizationsolutionmap {
  _ownerid_value: string;
  statuscode: number;
  componentidunique: string;
  componentstate: number;
  msdyn_solutiontype: number;
  solutionid: string;
  msdyn_solutionmetadata: string;
  msdyn_organizationsolutionmapid: string;
  iscustomizable: BooleanManagedProperty;
  modifiedon: string;
  _owninguser_value: string;
  _modifiedby_value: string;
  _modifiedonbehalfby_value: string;
  timezoneruleversionnumber: number;
  _owningteam_value: string;
  ismanaged: boolean;
  versionnumber: number;
  importsequencenumber: number;
  statecode: number;
  overriddencreatedon: string;
  msdyn_solutionbehaviour: number;
  _owningbusinessunit_value: string;
  utcconversiontimezonecode: number;
  msdyn_reviewstate: number;
  createdon: string;
  msdyn_name: string;
  _createdby_value: string;
  overwritetime: string;
  msdyn_solutionid: string;
  _createdonbehalfby_value: string;
}
