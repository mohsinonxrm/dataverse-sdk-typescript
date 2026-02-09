import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * appactionrule entity type
 */
export interface appactionrule {
  iscustomizable: BooleanManagedProperty;
  name: string;
  overwritetime: string;
  appactionruleid: string;
  _modifiedonbehalfby_value: string;
  _createdonbehalfby_value: string;
  createdon: string;
  _contextentity_value: string;
  componentidunique: string;
  statecode: number;
  importsequencenumber: number;
  definition: string;
  overriddencreatedon: string;
  ismanaged: boolean;
  type: number;
  _modifiedby_value: string;
  _createdby_value: string;
  uniquename: string;
  statuscode: number;
  context: number;
  solutionid: string;
  contextvalue: string;
  utcconversiontimezonecode: number;
  componentstate: number;
  versionnumber: number;
  _organizationid_value: string;
  timezoneruleversionnumber: number;
  modifiedon: string;
}
