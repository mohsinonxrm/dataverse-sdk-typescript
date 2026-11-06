import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * featurecontrolsetting entity type
 */
export interface featurecontrolsetting {
  importsequencenumber?: number;
  utcconversiontimezonecode?: number;
  _createdby_value?: string;
  _owningteam_value?: string;
  ismanaged?: boolean;
  overriddencreatedon?: string;
  name?: string;
  versionnumber?: number;
  fullname?: string;
  _createdonbehalfby_value?: string;
  solutionid?: string;
  timezoneruleversionnumber?: number;
  _ownerid_value?: string;
  uniquename?: string;
  componentidunique?: string;
  publickeytoken?: string;
  _owningbusinessunit_value?: string;
  createdon?: string;
  statecode?: number;
  _owninguser_value?: string;
  componentstate?: number;
  modifiedon?: string;
  featurecontrolsettingid?: string;
  countoffcs?: number;
  iscustomizable?: BooleanManagedProperty;
  _modifiedonbehalfby_value?: string;
  _modifiedby_value?: string;
  statuscode?: number;
  content?: string;
  overwritetime?: string;
}
