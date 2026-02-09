import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_maskingrule entity type
 */
export interface msdyn_maskingrule {
  ismanaged: boolean;
  msdyn_masked_test_data: string;
  overwritetime: string;
  modifiedon: string;
  timezoneruleversionnumber: number;
  msdyn_enter_test_data: string;
  overriddencreatedon: string;
  _modifiedonbehalfby_value: string;
  iscustomizable: BooleanManagedProperty;
  statecode: number;
  versionnumber: number;
  createdon: string;
  solutionid: string;
  msdyn_regular_expression: string;
  _createdonbehalfby_value: string;
  componentstate: number;
  msdyn_name: string;
  msdyn_masked_character: string;
  _modifiedby_value: string;
  _createdby_value: string;
  statuscode: number;
  msdyn_description: string;
  msdyn_maskingruleid: string;
  componentidunique: string;
  importsequencenumber: number;
  utcconversiontimezonecode: number;
  _organizationid_value: string;
}
