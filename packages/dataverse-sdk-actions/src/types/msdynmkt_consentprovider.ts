import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdynmkt_consentprovider entity type
 */
export interface msdynmkt_consentprovider {
  importsequencenumber?: number;
  timezoneruleversionnumber?: number;
  createdon?: string;
  versionnumber?: number;
  _ownerid_value?: string;
  iscustomizable?: BooleanManagedProperty;
  _owninguser_value?: string;
  ismanaged?: boolean;
  msdynmkt_consentproviderexternalformidentifier?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  componentidunique?: string;
  msdynmkt_consentcheckurltemplate?: string;
  _modifiedonbehalfby_value?: string;
  msdynmkt_consentresolutiontrackingoptions?: number;
  solutionid?: string;
  msdynmkt_consentproviderid?: string;
  msdynmkt_email_consentresolutiontrackingoverride?: number;
  _owningteam_value?: string;
  msdynmkt_oneclickunsubscribesupported?: boolean;
  msdynmkt_name?: string;
  msdynmkt_consentproviderexternalpurposeformidentifier?: string;
  _createdby_value?: string;
  statecode?: number;
  msdynmkt_consentproviderexternalpurposeentity?: string;
  componentstate?: number;
  _createdonbehalfby_value?: string;
  modifiedon?: string;
  msdynmkt_consentproviderexternalentity?: string;
  _modifiedby_value?: string;
  msdynmkt_consentresolutionmessageoptions?: number;
  msdynmkt_email_consentresolutionmessageoverride?: number;
  _owningbusinessunit_value?: string;
  statuscode?: number;
  utcconversiontimezonecode?: number;
}
