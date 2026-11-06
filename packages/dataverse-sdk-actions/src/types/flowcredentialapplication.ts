import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * flowcredentialapplication entity type
 */
export interface flowcredentialapplication {
  name?: string;
  _owningbusinessunit_value?: string;
  description?: string;
  _owninguser_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedonbehalfby_value?: string;
  thumbprint?: string;
  _flowmachinegroupid_value?: string;
  sharingtype?: number;
  utcconversiontimezonecode?: number;
  timezoneruleversionnumber?: number;
  ismanaged?: boolean;
  statuscode?: number;
  modifiedon?: string;
  _owningteam_value?: string;
  _ownerid_value?: string;
  createdon?: string;
  overwritetime?: string;
  overriddencreatedon?: string;
  secondarycertificatefile?: string;
  importsequencenumber?: number;
  _modifiedby_value?: string;
  _createdby_value?: string;
  solutionid?: string;
  flowcredentialapplicationid?: string;
  componentstate?: number;
  componentidunique?: string;
  iscustomizable?: BooleanManagedProperty;
  statecode?: number;
  primarycertificatefile?: string;
  versionnumber?: number;
  applicationid?: string;
}
