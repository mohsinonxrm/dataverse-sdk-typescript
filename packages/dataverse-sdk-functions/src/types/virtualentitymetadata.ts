import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * virtualentitymetadata entity type
 */
export interface virtualentitymetadata {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _extensionofrecordid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  isattachmentssupported?: boolean;
  ischangedfieldsenabledforupdateevent?: boolean;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  isonexternalcreatedenabled?: boolean;
  isonexternaldeletedenabled?: boolean;
  isonexternalupdatedenabled?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  virtualentitymetadataid?: string;
}
