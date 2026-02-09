import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_preferredagentcustomeridentity entity type
 */
export interface msdyn_preferredagentcustomeridentity {
  msdyn_associatedfieldname: string;
  modifiedon: string;
  _modifiedonbehalfby_value: string;
  componentidunique: string;
  versionnumber: number;
  msdyn_preferredagentcustomeridentityid: string;
  _modifiedby_value: string;
  createdon: string;
  solutionid: string;
  ismanaged: boolean;
  utcconversiontimezonecode: number;
  statecode: number;
  _owningteam_value: string;
  _owningbusinessunit_value: string;
  _ownerid_value: string;
  componentstate: number;
  importsequencenumber: number;
  msdyn_name: string;
  timezoneruleversionnumber: number;
  overwritetime: string;
  statuscode: number;
  _owninguser_value: string;
  _createdby_value: string;
  overriddencreatedon: string;
  iscustomizable: BooleanManagedProperty;
  msdyn_entityname: string;
  _createdonbehalfby_value: string;
}
