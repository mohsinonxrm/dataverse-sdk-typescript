import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_channelcapability entity type
 */
export interface msdyn_channelcapability {
  _modifiedby_value?: string;
  overriddencreatedon?: string;
  _organizationid_value?: string;
  statecode?: number;
  timezoneruleversionnumber?: number;
  statuscode?: number;
  _msdyn_conversationaction_value?: string;
  _createdonbehalfby_value?: string;
  msdyn_escalationchannelmode?: number;
  versionnumber?: number;
  _msdyn_provider_value?: string;
  msdyn_channelcapabilityid?: string;
  modifiedon?: string;
  utcconversiontimezonecode?: number;
  componentidunique?: string;
  _modifiedonbehalfby_value?: string;
  componentstate?: number;
  msdyn_name?: string;
  ismanaged?: boolean;
  iscustomizable?: BooleanManagedProperty;
  createdon?: string;
  importsequencenumber?: number;
  solutionid?: string;
  _createdby_value?: string;
  overwritetime?: string;
}
