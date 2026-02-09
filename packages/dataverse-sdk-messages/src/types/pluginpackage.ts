import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * pluginpackage entity type
 */
export interface pluginpackage {
  uniquename: string;
  createdon: string;
  fileid_name: string;
  exportkeyversion: number;
  componentstate: number;
  importsequencenumber: number;
  statecode: number;
  modifiedon: string;
  _createdonbehalfby_value: string;
  versionnumber: number;
  overwritetime: string;
  _modifiedby_value: string;
  ismanaged: boolean;
  statuscode: number;
  fileid: string;
  content: string;
  package: string;
  timezoneruleversionnumber: number;
  version: string;
  utcconversiontimezonecode: number;
  _modifiedonbehalfby_value: string;
  _organizationid_value: string;
  pluginpackageid: string;
  iscustomizable: BooleanManagedProperty;
  _managedidentityid_value: string;
  solutionid: string;
  overriddencreatedon: string;
  _createdby_value: string;
  package_name: string;
  name: string;
  componentidunique: string;
}
