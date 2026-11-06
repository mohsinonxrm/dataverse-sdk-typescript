import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_channelprofilenotificationtemplate entity type
 */
export interface msdyn_channelprofilenotificationtemplate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_channelprofileid_value?: string;
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
  msdyn_channelprofilenotificationtemplateid?: string;
  msdyn_name?: string;
  msdyn_notificationtemplate_callback_previewdialing?: string;
  msdyn_notificationtemplate_consult?: string;
  msdyn_notificationtemplate_incoming_auth?: string;
  msdyn_notificationtemplate_incoming_unauth?: string;
  msdyn_notificationtemplate_supervisorassign?: string;
  msdyn_notificationtemplate_transfer?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
