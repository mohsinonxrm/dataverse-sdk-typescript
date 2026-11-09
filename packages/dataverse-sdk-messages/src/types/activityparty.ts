/**
 * activityparty entity type
 */
export interface activityparty {
  _activityid_value?: string;
  _ownerid_value?: string;
  _partyid_value?: string;
  _resourcespecid_value?: string;
  activitypartyid?: string;
  addressused?: string;
  addressusedemailcolumnnumber?: number;
  donotemail?: boolean;
  donotfax?: boolean;
  donotphone?: boolean;
  donotpostalmail?: boolean;
  effort?: number;
  exchangeentryid?: string;
  externalid?: string;
  externalidtype?: string;
  instancetypecode?: number;
  ispartydeleted?: boolean;
  participationtypemask?: number;
  scheduledend?: string;
  scheduledstart?: string;
  unresolvedpartyname?: string;
  versionnumber?: number;
}
