import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * appactionmigration entity type
 */
export interface appactionmigration {
  modifiedon: string;
  componentstate: number;
  createdon: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
  componentidunique: string;
  _createdonbehalfby_value: string;
  overwritetime: string;
  iscustomizable: BooleanManagedProperty;
  _createdby_value: string;
  ismanaged: boolean;
  name: string;
  ismigrated: boolean;
  solutionid: string;
  statecode: number;
  timezoneruleversionnumber: number;
  statuscode: number;
  overriddencreatedon: string;
  appactionmigrationid: string;
  _organizationid_value: string;
  solutionuniquename: string;
  importsequencenumber: number;
  _modifiedby_value: string;
  _modifiedonbehalfby_value: string;
}
