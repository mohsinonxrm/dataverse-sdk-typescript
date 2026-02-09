import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * virtualentitymetadata entity type
 */
export interface virtualentitymetadata {
  versionnumber: number;
  isonexternalupdatedenabled: boolean;
  isattachmentssupported: boolean;
  timezoneruleversionnumber: number;
  iscustomizable: BooleanManagedProperty;
  utcconversiontimezonecode: number;
  componentidunique: string;
  solutionid: string;
  statecode: number;
  ischangedfieldsenabledforupdateevent: boolean;
  virtualentitymetadataid: string;
  createdon: string;
  isonexternaldeletedenabled: boolean;
  ismanaged: boolean;
  _createdonbehalfby_value: string;
  componentstate: number;
  _extensionofrecordid_value: string;
  overriddencreatedon: string;
  overwritetime: string;
  name: string;
  _organizationid_value: string;
  _modifiedby_value: string;
  modifiedon: string;
  _modifiedonbehalfby_value: string;
  _createdby_value: string;
  statuscode: number;
  isonexternalcreatedenabled: boolean;
  importsequencenumber: number;
}
