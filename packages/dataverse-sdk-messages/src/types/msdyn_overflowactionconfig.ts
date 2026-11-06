import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_overflowactionconfig entity type
 */
export interface msdyn_overflowactionconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_directcallbackoutboundprofile_value?: string;
  _msdyn_proactive_callback_profileid_value?: string;
  _msdyn_schedulecallbackoutboundworkstream_value?: string;
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
  msdyn_botfailureactiontype?: number;
  msdyn_directcallbackaction?: number;
  msdyn_directcallbackdedupsetting?: boolean;
  msdyn_directcallbackqueuesetting?: number;
  msdyn_name?: string;
  msdyn_overflowactionconfigid?: string;
  msdyn_overflowactiondata?: string;
  msdyn_overflowactiontype?: number;
  msdyn_stoptranscriptionandrecordingaftercalltransfer?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
