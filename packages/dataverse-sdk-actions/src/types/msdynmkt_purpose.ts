import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdynmkt_purpose entity type
 */
export interface msdynmkt_purpose {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdynmkt_extendedentityid_value?: string;
  _msdynmkt_uionlycomplianceprofilelookup_value?: string;
  _msdynmkt_uionlypurposelookup_value?: string;
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
  msdynmkt_customenforcementmodel?: number;
  msdynmkt_description?: string;
  msdynmkt_enforcementmodel?: number;
  msdynmkt_name?: string;
  msdynmkt_purposeid?: string;
  msdynmkt_smsenforcementmodel?: number;
  msdynmkt_topiccount?: number;
  msdynmkt_type?: number;
  msdynmkt_voiceenforcementmodel?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
