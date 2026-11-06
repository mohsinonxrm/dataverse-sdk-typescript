import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_salesagentprofile entity type
 */
export interface msdyn_salesagentprofile {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_activatedby_value?: string;
  _msdyn_salesagentinfo_value?: string;
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
  msdyn_activatedon?: string;
  msdyn_agentlocalecode?: string;
  msdyn_aidisclaimer?: string;
  msdyn_complianceprofile?: string;
  msdyn_description?: string;
  msdyn_emailsignaturerecordid?: string;
  msdyn_iscomplianceenabled?: boolean;
  msdyn_isrecommendedactionagentenabled?: boolean;
  msdyn_microagentsconfiguration?: string;
  msdyn_name?: string;
  msdyn_otherterms?: string;
  msdyn_previousstatuscode?: number;
  msdyn_publisherrordetails?: string;
  msdyn_publishstartedon?: string;
  msdyn_publishstatus?: number;
  msdyn_purpose?: string;
  msdyn_salesagentprofileid?: string;
  msdyn_salesagenttype?: number;
  msdyn_segmentinfo?: string;
  msdyn_topic?: string;
  msdyn_version?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
