import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * attributeclusterconfig entity type
 */
export interface attributeclusterconfig {
  modifiedon: string;
  _modifiedonbehalfby_value: string;
  name: string;
  isinheritedparentforcluster: boolean;
  importsequencenumber: number;
  attributeclusterconfigid: string;
  _organizationid_value: string;
  overriddencreatedon: string;
  versionnumber: number;
  ismanaged: boolean;
  overwritetime: string;
  timezoneruleversionnumber: number;
  componentidunique: string;
  statuscode: number;
  _createdby_value: string;
  _extensionofrecordid_value: string;
  iscustomizable: BooleanManagedProperty;
  statecode: number;
  utcconversiontimezonecode: number;
  createdon: string;
  componentstate: number;
  solutionid: string;
  skipautoreplicate: boolean;
  _modifiedby_value: string;
  _createdonbehalfby_value: string;
}
