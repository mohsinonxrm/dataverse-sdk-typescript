import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_channelprofile entity type
 */
export interface msdyn_channelprofile {
  _ownerid_value?: string;
  solutionid?: string;
  overriddencreatedon?: string;
  statuscode?: number;
  ismanaged?: boolean;
  _createdby_value?: string;
  overwritetime?: string;
  msdyn_conversationmode?: number;
  _modifiedby_value?: string;
  msdyn_channelprofileid?: string;
  modifiedon?: string;
  _owningteam_value?: string;
  iscustomizable?: BooleanManagedProperty;
  msdyn_streamsource?: number;
  versionnumber?: number;
  componentstate?: number;
  createdon?: string;
  timezoneruleversionnumber?: number;
  _owningbusinessunit_value?: string;
  utcconversiontimezonecode?: number;
  _modifiedonbehalfby_value?: string;
  componentidunique?: string;
  _owninguser_value?: string;
  msdyn_name?: string;
  _createdonbehalfby_value?: string;
  statecode?: number;
  importsequencenumber?: number;
}
