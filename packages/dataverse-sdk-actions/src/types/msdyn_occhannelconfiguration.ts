import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_occhannelconfiguration entity type
 */
export interface msdyn_occhannelconfiguration {
  statecode?: number;
  msdyn_privacytermsaccepted?: boolean;
  msdyn_closeconversationifoooh?: boolean;
  createdon?: string;
  solutionid?: string;
  msdyn_engagementcontext?: string;
  modifiedon?: string;
  _modifiedonbehalfby_value?: string;
  importsequencenumber?: number;
  overwritetime?: string;
  msdyn_enabletransfertoooohqueue?: boolean;
  msdyn_name?: string;
  componentidunique?: string;
  statuscode?: number;
  utcconversiontimezonecode?: number;
  timezoneruleversionnumber?: number;
  overriddencreatedon?: string;
  componentstate?: number;
  ismanaged?: boolean;
  _createdby_value?: string;
  _modifiedby_value?: string;
  msdyn_streamsource?: number;
  _createdonbehalfby_value?: string;
  msdyn_privacytermsversion?: string;
  versionnumber?: number;
  iscustomizable?: BooleanManagedProperty;
  msdyn_occhannelconfigurationid?: string;
  _organizationid_value?: string;
}
