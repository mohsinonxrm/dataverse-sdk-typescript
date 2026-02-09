import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_copilotsummarizationsetting entity type
 */
export interface msdyn_copilotsummarizationsetting {
  msdyn_interactiondatadisabled: boolean;
  _modifiedby_value: string;
  utcconversiontimezonecode: number;
  overwritetime: string;
  msdyn_interactionsenabled: boolean;
  msdyn_casesummaryconfiguration: string;
  msdyn_autoenabled: boolean;
  msdyn_conversationsummaryconfiguration: string;
  msdyn_systemmetadata: string;
  overriddencreatedon: string;
  msdyn_isdefaultconfig: boolean;
  componentstate: number;
  msdyn_featureaccessrolelist: string;
  msdyn_excludeformslist: string;
  timezoneruleversionnumber: number;
  msdyn_applicableformslist: string;
  msdyn_enabled: boolean;
  ismanaged: boolean;
  msdyn_disabledforplatformsummary: boolean;
  msdyn_copilotsummarizationsettingid: string;
  importsequencenumber: number;
  solutionid: string;
  componentidunique: string;
  _createdonbehalfby_value: string;
  msdyn_relatedrecordconfiguration: string;
  msdyn_ondemandenabled: boolean;
  msdyn_casesummaryenabled: boolean;
  msdyn_summarytype: number;
  msdyn_autoenableddone: boolean;
  statuscode: number;
  msdyn_useagentlanguage: boolean;
  _createdby_value: string;
  msdyn_name: string;
  msdyn_allowcreatecase: boolean;
  versionnumber: number;
  _organizationid_value: string;
  msdyn_allowcrossgeo: boolean;
  msdyn_allowtranslation: boolean;
  statecode: number;
  msdyn_whenagentjoinsenabled: boolean;
  iscustomizable: BooleanManagedProperty;
  _modifiedonbehalfby_value: string;
  modifiedon: string;
  msdyn_consentacceptedon: string;
  msdyn_whenconversationendsenabled: boolean;
  createdon: string;
}
