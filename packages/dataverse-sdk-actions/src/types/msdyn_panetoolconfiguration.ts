import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_panetoolconfiguration entity type
 */
export interface msdyn_panetoolconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_icon_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_category?: number;
  msdyn_controlname?: string;
  msdyn_data?: string;
  msdyn_defaulticon?: string;
  msdyn_description?: string;
  msdyn_isconfigurable?: boolean;
  msdyn_isglobal?: boolean;
  msdyn_learnmorelink?: string;
  msdyn_name?: string;
  msdyn_panetoolconfigurationid?: string;
  msdyn_toolconfigurationentity?: string;
  msdyn_type?: number;
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
