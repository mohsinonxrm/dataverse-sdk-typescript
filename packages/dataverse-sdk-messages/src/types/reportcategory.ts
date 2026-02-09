import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * reportcategory entity type
 */
export interface reportcategory {
  modifiedon: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
  iscustomizable: BooleanManagedProperty;
  ismanaged: boolean;
  reportcategoryid: string;
  overwritetime: string;
  owninguser: string;
  _modifiedby_value: string;
  _createdonbehalfby_value: string;
  reportcategoryidunique: string;
  importsequencenumber: number;
  solutionid: string;
  _ownerid_value: string;
  exchangerate: number;
  _modifiedonbehalfby_value: string;
  createdon: string;
  _createdby_value: string;
  _reportid_value: string;
  componentstate: number;
  _transactioncurrencyid_value: string;
  timezoneruleversionnumber: number;
  owningbusinessunit: string;
  categorycode: number;
}
