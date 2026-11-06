import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_occhannelstateconfiguration entity type
 */
export interface msdyn_occhannelstateconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_occhannelconfigurationid_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_autocloseliveworkitemafter?: number;
  msdyn_name?: string;
  msdyn_occhannelstateconfigurationid?: string;
  msdyn_ocliveworkitemstate?: number;
  msdyn_showconfirmationonsessionclose?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
