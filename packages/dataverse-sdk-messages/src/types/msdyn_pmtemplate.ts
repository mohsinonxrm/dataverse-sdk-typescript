import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmtemplate entity type
 */
export interface msdyn_pmtemplate {
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
  msdyn_author?: string;
  msdyn_category?: string;
  msdyn_configuration?: string;
  msdyn_description?: string;
  msdyn_icon?: string;
  msdyn_iconname?: string;
  msdyn_isprivatetemplate?: boolean;
  msdyn_locale?: string;
  msdyn_mashupscript?: string;
  msdyn_name?: string;
  msdyn_pmtemplateid?: string;
  msdyn_subcategory?: string;
  msdyn_templategroupid?: string;
  msdyn_templateversion?: string;
  msdyn_type?: string;
  msdyn_uniquename?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
