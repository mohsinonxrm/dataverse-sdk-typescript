import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdynmkt_compliancesettings4 entity type
 */
export interface msdynmkt_compliancesettings4 {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdynmkt_consentproviderid_value?: string;
  _msdynmkt_extendedentityid_value?: string;
  _msdynmkt_trackingconsentpurpose_value?: string;
  _msdynmkt_uionly_linked_profile_value?: string;
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
  msdynmkt_compliancesettings4id?: string;
  msdynmkt_consentlink?: string;
  msdynmkt_consentlink_customerprofile?: string;
  msdynmkt_consentlink_leads?: string;
  msdynmkt_consentlinktype?: number;
  msdynmkt_doiconfirmationtext?: string;
  msdynmkt_doiconfirmationtype?: number;
  msdynmkt_doiconfirmationurl?: string;
  msdynmkt_doifailurereason?: string;
  msdynmkt_doijobstatus?: number;
  msdynmkt_doistatus?: number;
  msdynmkt_emaildescription?: string;
  msdynmkt_gettrackingconsents?: boolean;
  msdynmkt_globaldoienabled?: boolean;
  msdynmkt_jurisdiction?: number;
  msdynmkt_legaladdress?: string;
  msdynmkt_migrationtimestamp?: string;
  msdynmkt_name?: string;
  msdynmkt_ssc_allowemaildescription?: string;
  msdynmkt_ssc_allowsmsdescription?: string;
  msdynmkt_ssc_allowtrackingdescription?: string;
  msdynmkt_ssc_consentchangereason?: string;
  msdynmkt_ssc_description?: string;
  msdynmkt_ssc_emailtitle?: string;
  msdynmkt_ssc_errorpagetext?: string;
  msdynmkt_ssc_legaltext?: string;
  msdynmkt_ssc_smsdescription?: string;
  msdynmkt_ssc_smstitle?: string;
  msdynmkt_ssc_submitbuttonlabel?: string;
  msdynmkt_ssc_thankyoupagetext?: string;
  msdynmkt_ssc_title?: string;
  msdynmkt_ssc_trackingdescription?: string;
  msdynmkt_ssc_trackingtitle?: string;
  msdynmkt_subscriptioncenter?: string;
  msdynmkt_uionly_link_existing_profile?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
