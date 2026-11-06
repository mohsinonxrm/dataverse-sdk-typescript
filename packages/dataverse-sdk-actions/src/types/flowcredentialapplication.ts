import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * flowcredentialapplication entity type
 */
export interface flowcredentialapplication {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _flowmachinegroupid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  applicationid?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  flowcredentialapplicationid?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  primarycertificatefile?: string;
  secondarycertificatefile?: string;
  sharingtype?: number;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  thumbprint?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
