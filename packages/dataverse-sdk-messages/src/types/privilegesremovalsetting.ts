import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * privilegesremovalsetting entity type
 */
export interface privilegesremovalsetting {
  iscustomizable: BooleanManagedProperty;
  isappendremoved: boolean;
  iswriteremoved: boolean;
  _createdby_value: string;
  versionnumber: number;
  isreadremoved: boolean;
  isdeleteremoved: boolean;
  ismanaged: boolean;
  createdon: string;
  iscreateremoved: boolean;
  solutionid: string;
  componentstate: number;
  privilegesremovalsettingid: string;
  componentidunique: string;
  importsequencenumber: number;
  _modifiedonbehalfby_value: string;
  isappendtoremoved: boolean;
  modifiedon: string;
  name: string;
  _createdonbehalfby_value: string;
  isassignremoved: boolean;
  _organizationid_value: string;
  overriddencreatedon: string;
  overwritetime: string;
  utcconversiontimezonecode: number;
  _extensionofrecordid_value: string;
  _modifiedby_value: string;
  timezoneruleversionnumber: number;
}
