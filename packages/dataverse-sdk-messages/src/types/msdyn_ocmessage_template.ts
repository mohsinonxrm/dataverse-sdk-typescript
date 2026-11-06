import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocmessage_template entity type
 */
export interface msdyn_ocmessage_template {
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
  msdyn_bodytext?: string;
  msdyn_category?: number;
  msdyn_channelinstanceid?: string;
  msdyn_channeltype?: number;
  msdyn_content?: string;
  msdyn_displayname?: string;
  msdyn_language?: string;
  msdyn_lastsyncedon?: string;
  msdyn_name?: string;
  msdyn_ocmessage_template_type?: number;
  msdyn_ocmessage_templateid?: string;
  msdyn_providerlastupdatedon?: string;
  msdyn_providerstatus?: number;
  msdyn_providertemplateid?: string;
  msdyn_providertype?: number;
  msdyn_qualityscore?: number;
  msdyn_rejectionreason?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
