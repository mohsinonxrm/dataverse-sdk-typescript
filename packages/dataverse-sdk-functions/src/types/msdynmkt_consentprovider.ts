import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdynmkt_consentprovider entity type
 */
export interface msdynmkt_consentprovider {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
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
  msdynmkt_consentcheckurltemplate?: string;
  msdynmkt_consentproviderexternalentity?: string;
  msdynmkt_consentproviderexternalformidentifier?: string;
  msdynmkt_consentproviderexternalpurposeentity?: string;
  msdynmkt_consentproviderexternalpurposeformidentifier?: string;
  msdynmkt_consentproviderid?: string;
  msdynmkt_consentresolutionmessageoptions?: number;
  msdynmkt_consentresolutiontrackingoptions?: number;
  msdynmkt_email_consentresolutionmessageoverride?: number;
  msdynmkt_email_consentresolutiontrackingoverride?: number;
  msdynmkt_name?: string;
  msdynmkt_oneclickunsubscribesupported?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
