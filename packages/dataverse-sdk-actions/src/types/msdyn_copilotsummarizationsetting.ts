import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_copilotsummarizationsetting entity type
 */
export interface msdyn_copilotsummarizationsetting {
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
  msdyn_allowcreatecase?: boolean;
  msdyn_allowcrossgeo?: boolean;
  msdyn_allowtranslation?: boolean;
  msdyn_applicableformslist?: string;
  msdyn_autoenabled?: boolean;
  msdyn_autoenableddone?: boolean;
  msdyn_casesummaryconfiguration?: string;
  msdyn_casesummaryenabled?: boolean;
  msdyn_consentacceptedon?: string;
  msdyn_conversationsummaryconfiguration?: string;
  msdyn_copilotsummarizationsettingid?: string;
  msdyn_customconversationsummaryattribute?: string;
  msdyn_disabledforplatformsummary?: boolean;
  msdyn_emailsummaryconfiguration?: string;
  msdyn_emailsummaryenabled?: boolean;
  msdyn_enabled?: boolean;
  msdyn_excludeformslist?: string;
  msdyn_featureaccessrolelist?: string;
  msdyn_interactiondatadisabled?: boolean;
  msdyn_interactionsenabled?: boolean;
  msdyn_isdefaultconfig?: boolean;
  msdyn_name?: string;
  msdyn_ondemandenabled?: boolean;
  msdyn_relatedrecordconfiguration?: string;
  msdyn_setexportable?: boolean;
  msdyn_summarytype?: number;
  msdyn_systemmetadata?: string;
  msdyn_useagentlanguage?: boolean;
  msdyn_whenagentjoinsenabled?: boolean;
  msdyn_whenconversationendsenabled?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
