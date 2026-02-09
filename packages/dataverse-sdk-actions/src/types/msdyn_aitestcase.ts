import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aitestcase entity type
 */
export interface msdyn_aitestcase {
  msdyn_name: string;
  ismanaged: boolean;
  _owningteam_value: string;
  _modifiedonbehalfby_value: string;
  statuscode: number;
  overriddencreatedon: string;
  msdyn_aiobjecttype: string;
  componentidunique: string;
  timezoneruleversionnumber: number;
  msdyn_description: string;
  msdyn_testcasestate: number;
  overwritetime: string;
  _createdonbehalfby_value: string;
  statecode: number;
  _ownerid_value: string;
  utcconversiontimezonecode: number;
  _owningbusinessunit_value: string;
  componentstate: number;
  solutionid: string;
  createdon: string;
  _createdby_value: string;
  modifiedon: string;
  msdyn_expectedoutput: string;
  msdyn_source: string;
  msdyn_aitestcaseid: string;
  iscustomizable: BooleanManagedProperty;
  _owninguser_value: string;
  _modifiedby_value: string;
  msdyn_aiobjectid: string;
  importsequencenumber: number;
  versionnumber: number;
}
