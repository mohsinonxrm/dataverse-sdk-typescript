import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_overflowactionconfig entity type
 */
export interface msdyn_overflowactionconfig {
  _owningteam_value?: string;
  importsequencenumber?: number;
  ismanaged?: boolean;
  _modifiedonbehalfby_value?: string;
  modifiedon?: string;
  msdyn_overflowactiondata?: string;
  statuscode?: number;
  msdyn_botfailureactiontype?: number;
  solutionid?: string;
  msdyn_stoptranscriptionandrecordingaftercalltransfer?: boolean;
  msdyn_directcallbackdedupsetting?: boolean;
  statecode?: number;
  _ownerid_value?: string;
  overwritetime?: string;
  _createdby_value?: string;
  _modifiedby_value?: string;
  componentidunique?: string;
  utcconversiontimezonecode?: number;
  msdyn_overflowactiontype?: number;
  msdyn_directcallbackaction?: number;
  msdyn_directcallbackqueuesetting?: number;
  iscustomizable?: BooleanManagedProperty;
  _owningbusinessunit_value?: string;
  overriddencreatedon?: string;
  msdyn_name?: string;
  _createdonbehalfby_value?: string;
  componentstate?: number;
  createdon?: string;
  versionnumber?: number;
  msdyn_overflowactionconfigid?: string;
  _owninguser_value?: string;
  timezoneruleversionnumber?: number;
}
