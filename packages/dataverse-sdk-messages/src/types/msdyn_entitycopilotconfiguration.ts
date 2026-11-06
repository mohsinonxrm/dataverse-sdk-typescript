import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_entitycopilotconfiguration entity type
 */
export interface msdyn_entitycopilotconfiguration {
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
  msdyn_autotriggerproactiveinsight?: boolean;
  msdyn_datacontextconfiguration?: string;
  msdyn_displaytimer?: boolean;
  msdyn_enableintent?: boolean;
  msdyn_entitycopilotconfigurationid?: string;
  msdyn_entityname?: string;
  msdyn_fullaccesscheckcustomaction?: string;
  msdyn_name?: string;
  msdyn_showsentimentenabled?: boolean;
  msdyn_showslatimercontrolenabled?: boolean;
  msdyn_summarysettingid?: string;
  msdyn_viewconfiguration?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
