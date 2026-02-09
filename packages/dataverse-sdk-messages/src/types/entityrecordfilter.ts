import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * entityrecordfilter entity type
 */
export interface entityrecordfilter {
  modifiedon: string;
  _modifiedonbehalfby_value: string;
  statuscode: number;
  versionnumber: number;
  entityrecordfilterid: string;
  _createdonbehalfby_value: string;
  overriddencreatedon: string;
  ismanaged: boolean;
  _modifiedby_value: string;
  _recordfilterid_value: string;
  importsequencenumber: number;
  overwritetime: string;
  createdon: string;
  timezoneruleversionnumber: number;
  name: string;
  _createdby_value: string;
  _organizationid_value: string;
  objecttypecode: string;
  componentidunique: string;
  statecode: number;
  solutionid: string;
  utcconversiontimezonecode: number;
  componentstate: number;
  iscustomizable: BooleanManagedProperty;
}
