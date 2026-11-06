import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_conversationsummarysetting entity type
 */
export interface msdyn_conversationsummarysetting {
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
  msdyn_allagentsenabled?: boolean;
  msdyn_conversationends?: boolean;
  msdyn_conversationsummarysettingid?: string;
  msdyn_enabledforagents?: boolean;
  msdyn_name?: string;
  msdyn_previewlanguages?: boolean;
  msdyn_showcreatecase?: boolean;
  msdyn_systemagentlist?: string;
  msdyn_whenagentjoins?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
