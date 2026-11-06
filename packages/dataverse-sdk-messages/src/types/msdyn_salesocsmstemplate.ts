import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_salesocsmstemplate entity type
 */
export interface msdyn_salesocsmstemplate {
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
  msdyn_category?: string;
  msdyn_language?: number;
  msdyn_placeholders?: string;
  msdyn_salesocsmstemplateid?: string;
  msdyn_templatetext?: string;
  msdyn_title?: string;
  msdyn_viewableby?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
