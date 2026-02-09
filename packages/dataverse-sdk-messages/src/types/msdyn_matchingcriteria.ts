import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_matchingcriteria entity type
 */
export interface msdyn_matchingcriteria {
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  overwritetime: string;
  _ownerid_value: string;
  overriddencreatedon: string;
  msdyn_matchingcriteriaid: string;
  modifiedon: string;
  importsequencenumber: number;
  componentstate: number;
  componentidunique: string;
  createdon: string;
  statecode: number;
  _createdby_value: string;
  ismanaged: boolean;
  _modifiedonbehalfby_value: string;
  versionnumber: number;
  _modifiedby_value: string;
  _owningteam_value: string;
  _msdyn_parentcriteriaid_value: string;
  _owninguser_value: string;
  _owningbusinessunit_value: string;
  msdyn_name: string;
  statuscode: number;
  solutionid: string;
  _createdonbehalfby_value: string;
  msdyn_criteriatype: number;
  iscustomizable: BooleanManagedProperty;
}
