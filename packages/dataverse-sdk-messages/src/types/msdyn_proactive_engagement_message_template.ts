import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_proactive_engagement_message_template entity type
 */
export interface msdyn_proactive_engagement_message_template {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_ocmessage_templateid_value?: string;
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
  msdyn_name?: string;
  msdyn_proactive_engagement_message_template_content?: string;
  msdyn_proactive_engagement_message_template_type?: number;
  msdyn_proactive_engagement_message_template_used_personalization_tokens?: string;
  msdyn_proactive_engagement_message_templateid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
