import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * maskingrule entity type
 */
export interface maskingrule {
  createdon: string;
  _createdonbehalfby_value: string;
  solutionid: string;
  timezoneruleversionnumber: number;
  maskedcharacter: string;
  maskedrichtestdata: string;
  modifiedon: string;
  _modifiedby_value: string;
  ismanaged: boolean;
  displayname: string;
  maskedtestdata: string;
  componentidunique: string;
  componentstate: number;
  regularexpression: string;
  name: string;
  overwritetime: string;
  richtestdata: string;
  description: string;
  _createdby_value: string;
  _modifiedonbehalfby_value: string;
  iscustomizable: BooleanManagedProperty;
  testdata: string;
  _organizationid_value: string;
  utcconversiontimezonecode: number;
  maskingruleid: string;
}
