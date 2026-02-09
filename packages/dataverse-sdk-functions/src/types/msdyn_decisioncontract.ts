import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_decisioncontract entity type
 */
export interface msdyn_decisioncontract {
  _owningbusinessunit_value: string;
  statuscode: number;
  modifiedon: string;
  msdyn_uniquename: string;
  importsequencenumber: number;
  iscustomizable: BooleanManagedProperty;
  utcconversiontimezonecode: number;
  msdyn_decisioncontractid: string;
  msdyn_name: string;
  _owninguser_value: string;
  overwritetime: string;
  _owningteam_value: string;
  overriddencreatedon: string;
  createdon: string;
  _modifiedonbehalfby_value: string;
  msdyn_contractdefinition: string;
  ismanaged: boolean;
  _createdby_value: string;
  _modifiedby_value: string;
  versionnumber: number;
  _ownerid_value: string;
  timezoneruleversionnumber: number;
  componentidunique: string;
  _createdonbehalfby_value: string;
  statecode: number;
  solutionid: string;
  componentstate: number;
}
