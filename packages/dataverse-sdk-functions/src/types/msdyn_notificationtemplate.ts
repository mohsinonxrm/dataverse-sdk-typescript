import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_notificationtemplate entity type
 */
export interface msdyn_notificationtemplate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
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
  msdyn_acceptbuttontext?: string;
  msdyn_autoacceptnotification?: boolean;
  msdyn_autopopupsession?: boolean;
  msdyn_description?: string;
  msdyn_desktopnotificationmode?: number;
  msdyn_icon?: string;
  msdyn_name?: string;
  msdyn_notificationtemplateid?: string;
  msdyn_rejectbuttontext?: string;
  msdyn_showrejectbutton?: boolean;
  msdyn_showtimeout?: boolean;
  msdyn_suppressnotificationpopup?: boolean;
  msdyn_theme?: number;
  msdyn_timeout?: number;
  msdyn_title?: string;
  msdyn_uniquename?: string;
  msdyn_useMultiLineandMultiField?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
