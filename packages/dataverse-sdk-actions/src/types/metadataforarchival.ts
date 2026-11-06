import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * metadataforarchival entity type
 */
export interface metadataforarchival {
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
  isavailableforarchival?: boolean;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  isreadyforarchival?: boolean;
  metadataforarchivalid?: string;
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
}
