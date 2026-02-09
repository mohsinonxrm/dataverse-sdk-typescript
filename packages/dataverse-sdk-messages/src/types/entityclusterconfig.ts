import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * entityclusterconfig entity type
 */
export interface entityclusterconfig {
  _modifiedonbehalfby_value: string;
  importsequencenumber: number;
  _organizationid_value: string;
  timezoneruleversionnumber: number;
  statuscode: number;
  clustermode: number;
  versionnumber: number;
  statecode: number;
  solutionid: string;
  entityclusterconfigid: string;
  overwritetime: string;
  overriddencreatedon: string;
  utcconversiontimezonecode: number;
  _createdby_value: string;
  iscustomizable: BooleanManagedProperty;
  _modifiedby_value: string;
  createdon: string;
  shouldautoreplicate: boolean;
  ismanaged: boolean;
  _extensionofrecordid_value: string;
  _createdonbehalfby_value: string;
  componentidunique: string;
  modifiedon: string;
  name: string;
  defaulttolocalpartition: boolean;
  componentstate: number;
}
