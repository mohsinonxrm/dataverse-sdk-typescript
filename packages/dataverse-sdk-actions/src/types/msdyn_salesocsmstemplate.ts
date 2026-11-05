import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_salesocsmstemplate entity type
 */
export interface msdyn_salesocsmstemplate {
  overriddencreatedon?: string;
  _createdby_value?: string;
  msdyn_category?: string;
  createdon?: string;
  msdyn_salesocsmstemplateid?: string;
  solutionid?: string;
  importsequencenumber?: number;
  statuscode?: number;
  modifiedon?: string;
  msdyn_viewableby?: boolean;
  overwritetime?: string;
  msdyn_placeholders?: string;
  _modifiedby_value?: string;
  timezoneruleversionnumber?: number;
  ismanaged?: boolean;
  msdyn_templatetext?: string;
  _owninguser_value?: string;
  versionnumber?: number;
  msdyn_title?: string;
  statecode?: number;
  _owningteam_value?: string;
  msdyn_language?: number;
  iscustomizable?: BooleanManagedProperty;
  componentidunique?: string;
  _ownerid_value?: string;
  componentstate?: number;
  utcconversiontimezonecode?: number;
  _modifiedonbehalfby_value?: string;
  _createdonbehalfby_value?: string;
  _owningbusinessunit_value?: string;
}
