import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * metadataforarchival entity type
 */
export interface metadataforarchival {
  isreadyforarchival: boolean;
  componentidunique: string;
  _createdonbehalfby_value: string;
  statecode: number;
  createdon: string;
  _extensionofrecordid_value: string;
  _createdby_value: string;
  importsequencenumber: number;
  overriddencreatedon: string;
  componentstate: number;
  modifiedon: string;
  ismanaged: boolean;
  isavailableforarchival: boolean;
  solutionid: string;
  _modifiedonbehalfby_value: string;
  _modifiedby_value: string;
  versionnumber: number;
  name: string;
  iscustomizable: BooleanManagedProperty;
  statuscode: number;
  timezoneruleversionnumber: number;
  _organizationid_value: string;
  utcconversiontimezonecode: number;
  overwritetime: string;
  metadataforarchivalid: string;
}
