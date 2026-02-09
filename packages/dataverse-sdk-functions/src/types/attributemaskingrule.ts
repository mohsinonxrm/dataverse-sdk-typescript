import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * attributemaskingrule entity type
 */
export interface attributemaskingrule {
  componentstate: number;
  utcconversiontimezonecode: number;
  attributelogicalname: string;
  _modifiedby_value: string;
  solutionid: string;
  _organizationid_value: string;
  _createdonbehalfby_value: string;
  modifiedon: string;
  timezoneruleversionnumber: number;
  componentidunique: string;
  _createdby_value: string;
  createdon: string;
  uniquename: string;
  iscustomizable: BooleanManagedProperty;
  _maskingruleid_value: string;
  overwritetime: string;
  ismanaged: boolean;
  entityname: string;
  attributemaskingruleid: string;
  _modifiedonbehalfby_value: string;
}
