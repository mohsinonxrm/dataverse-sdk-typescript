import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_entitylinkchatconfiguration entity type
 */
export interface msdyn_entitylinkchatconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_entitytype_value?: string;
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
  msdyn_contextviewid?: string;
  msdyn_enableaiintroductionmessage?: boolean;
  msdyn_enableaisuggestion?: boolean;
  msdyn_enableautonamechats?: boolean;
  msdyn_enablekickoffmessage?: boolean;
  msdyn_enablelogicbasedsuggestion?: boolean;
  msdyn_entitylinkchatconfigurationid?: string;
  msdyn_filteringattributes?: string;
  msdyn_isenabledforbot?: boolean;
  msdyn_name?: string;
  msdyn_recentchatlinkercanunlink?: boolean;
  msdyn_recordownercanunlink?: boolean;
  msdyn_uniquename?: string;
  msdyn_usercanjoinchat?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
