import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * recordfilter entity type
 */
export interface recordfilter {
  isrolebusinessunitquery: boolean;
  _modifiedby_value: string;
  displayname: string;
  statuscode: number;
  componentidunique: string;
  _createdonbehalfby_value: string;
  _organizationid_value: string;
  recordfilterid: string;
  uniquename: string;
  overwritetime: string;
  statecode: number;
  _createdby_value: string;
  componentstate: number;
  filterlinkedrecords: boolean;
  utcconversiontimezonecode: number;
  overriddencreatedon: string;
  fetchxml: string;
  importsequencenumber: number;
  solutionid: string;
  modifiedon: string;
  _modifiedonbehalfby_value: string;
  ismanaged: boolean;
  versionnumber: number;
  timezoneruleversionnumber: number;
  createdon: string;
  iscustomizable: BooleanManagedProperty;
}
