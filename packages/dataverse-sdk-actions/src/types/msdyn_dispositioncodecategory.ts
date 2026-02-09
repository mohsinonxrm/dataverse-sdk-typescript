import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dispositioncodecategory entity type
 */
export interface msdyn_dispositioncodecategory {
  utcconversiontimezonecode: number;
  iscustomizable: BooleanManagedProperty;
  _createdonbehalfby_value: string;
  _ownerid_value: string;
  createdon: string;
  importsequencenumber: number;
  solutionid: string;
  _owningbusinessunit_value: string;
  componentidunique: string;
  modifiedon: string;
  msdyn_categoryname: string;
  statuscode: number;
  _modifiedonbehalfby_value: string;
  _createdby_value: string;
  componentstate: number;
  _owninguser_value: string;
  versionnumber: number;
  timezoneruleversionnumber: number;
  ismanaged: boolean;
  statecode: number;
  msdyn_dispositioncodecategoryid: string;
  _modifiedby_value: string;
  overriddencreatedon: string;
  _owningteam_value: string;
  overwritetime: string;
}
