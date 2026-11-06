import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_conversationsummarysetting entity type
 */
export interface msdyn_conversationsummarysetting {
  msdyn_allagentsenabled?: boolean;
  utcconversiontimezonecode?: number;
  msdyn_enabledforagents?: boolean;
  _createdby_value?: string;
  msdyn_systemagentlist?: string;
  solutionid?: string;
  _modifiedby_value?: string;
  ismanaged?: boolean;
  msdyn_whenagentjoins?: boolean;
  componentidunique?: string;
  iscustomizable?: BooleanManagedProperty;
  versionnumber?: number;
  importsequencenumber?: number;
  _organizationid_value?: string;
  msdyn_showcreatecase?: boolean;
  msdyn_conversationends?: boolean;
  msdyn_conversationsummarysettingid?: string;
  timezoneruleversionnumber?: number;
  componentstate?: number;
  statecode?: number;
  _createdonbehalfby_value?: string;
  modifiedon?: string;
  msdyn_name?: string;
  _modifiedonbehalfby_value?: string;
  overriddencreatedon?: string;
  msdyn_previewlanguages?: boolean;
  createdon?: string;
  overwritetime?: string;
  statuscode?: number;
}
