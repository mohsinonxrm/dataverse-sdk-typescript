import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * privilegesremovalsetting entity type
 */
export interface privilegesremovalsetting {
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
  isappendremoved?: boolean;
  isappendtoremoved?: boolean;
  isassignremoved?: boolean;
  iscreateremoved?: boolean;
  iscustomizable?: BooleanManagedProperty;
  isdeleteremoved?: boolean;
  ismanaged?: boolean;
  isreadremoved?: boolean;
  iswriteremoved?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  privilegesremovalsettingid?: string;
  solutionid?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
