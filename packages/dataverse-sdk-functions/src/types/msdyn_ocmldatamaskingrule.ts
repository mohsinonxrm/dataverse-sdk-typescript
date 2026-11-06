import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocmldatamaskingrule entity type
 */
export interface msdyn_ocmldatamaskingrule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_generateunredactedversion?: boolean;
  msdyn_maskfinancialdata?: boolean;
  msdyn_maskgovernmentids?: boolean;
  msdyn_maskhealthmedicaldata?: boolean;
  msdyn_maskpersonalattributes?: boolean;
  msdyn_name?: string;
  msdyn_ocmldatamaskingruleid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
