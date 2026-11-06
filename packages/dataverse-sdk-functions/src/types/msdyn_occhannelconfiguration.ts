import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_occhannelconfiguration entity type
 */
export interface msdyn_occhannelconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_closeconversationifoooh?: boolean;
  msdyn_enabletransfertoooohqueue?: boolean;
  msdyn_engagementcontext?: string;
  msdyn_name?: string;
  msdyn_occhannelconfigurationid?: string;
  msdyn_privacytermsaccepted?: boolean;
  msdyn_privacytermsversion?: string;
  msdyn_streamsource?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
