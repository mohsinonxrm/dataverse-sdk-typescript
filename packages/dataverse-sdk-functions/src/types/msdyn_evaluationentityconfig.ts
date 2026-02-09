import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evaluationentityconfig entity type
 */
export interface msdyn_evaluationentityconfig {
  createdon: string;
  utcconversiontimezonecode: number;
  modifiedon: string;
  solutionid: string;
  overwritetime: string;
  versionnumber: number;
  _createdonbehalfby_value: string;
  msdyn_isenabled: boolean;
  msdyn_name: string;
  overriddencreatedon: string;
  ismanaged: boolean;
  _modifiedonbehalfby_value: string;
  statuscode: number;
  msdyn_evaluationentityconfigid: string;
  _owningteam_value: string;
  msdyn_entityallowedforevaluation: boolean;
  _createdby_value: string;
  componentidunique: string;
  timezoneruleversionnumber: number;
  _modifiedby_value: string;
  msdyn_entitylogicalname: string;
  _owningbusinessunit_value: string;
  componentstate: number;
  statecode: number;
  importsequencenumber: number;
  iscustomizable: BooleanManagedProperty;
  _owninguser_value: string;
  msdyn_evaluationrecordtype: number;
  _ownerid_value: string;
}
