import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * reportcategory entity type
 */
export interface reportcategory {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _reportid_value?: string;
  _transactioncurrencyid_value?: string;
  categorycode?: number;
  componentstate?: number;
  createdon?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  overwritetime?: string;
  owningbusinessunit?: string;
  owninguser?: string;
  reportcategoryid?: string;
  reportcategoryidunique?: string;
  solutionid?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
