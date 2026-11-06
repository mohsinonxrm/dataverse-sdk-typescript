import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_entitycopilotconfiguration entity type
 */
export interface msdyn_entitycopilotconfiguration {
  msdyn_showslatimercontrolenabled?: boolean;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  solutionid?: string;
  msdyn_enableintent?: boolean;
  createdon?: string;
  statuscode?: number;
  overriddencreatedon?: string;
  msdyn_entitycopilotconfigurationid?: string;
  _modifiedonbehalfby_value?: string;
  msdyn_datacontextconfiguration?: string;
  timezoneruleversionnumber?: number;
  overwritetime?: string;
  msdyn_viewconfiguration?: string;
  componentstate?: number;
  modifiedon?: string;
  _organizationid_value?: string;
  versionnumber?: number;
  _createdonbehalfby_value?: string;
  msdyn_showsentimentenabled?: boolean;
  _createdby_value?: string;
  componentidunique?: string;
  statecode?: number;
  msdyn_entityname?: string;
  utcconversiontimezonecode?: number;
  msdyn_autotriggerproactiveinsight?: boolean;
  _modifiedby_value?: string;
  ismanaged?: boolean;
  msdyn_summarysettingid?: string;
  msdyn_name?: string;
  msdyn_displaytimer?: boolean;
}
