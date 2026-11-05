import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_entitylinkchatconfiguration entity type
 */
export interface msdyn_entitylinkchatconfiguration {
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  msdyn_enablelogicbasedsuggestion?: boolean;
  solutionid?: string;
  msdyn_enableaiintroductionmessage?: boolean;
  msdyn_enablekickoffmessage?: boolean;
  overwritetime?: string;
  msdyn_enableaisuggestion?: boolean;
  iscustomizable?: BooleanManagedProperty;
  msdyn_uniquename?: string;
  createdon?: string;
  ismanaged?: boolean;
  msdyn_usercanjoinchat?: boolean;
  msdyn_entitylinkchatconfigurationid?: string;
  _createdonbehalfby_value?: string;
  msdyn_isenabledforbot?: boolean;
  _modifiedby_value?: string;
  _owningteam_value?: string;
  _createdby_value?: string;
  statecode?: number;
  modifiedon?: string;
  componentidunique?: string;
  _msdyn_entitytype_value?: string;
  componentstate?: number;
  msdyn_recordownercanunlink?: boolean;
  msdyn_filteringattributes?: string;
  msdyn_name?: string;
  msdyn_recentchatlinkercanunlink?: boolean;
  _owninguser_value?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  msdyn_contextviewid?: string;
  overriddencreatedon?: string;
  importsequencenumber?: number;
  msdyn_enableautonamechats?: boolean;
  statuscode?: number;
  _modifiedonbehalfby_value?: string;
  timezoneruleversionnumber?: number;
}
