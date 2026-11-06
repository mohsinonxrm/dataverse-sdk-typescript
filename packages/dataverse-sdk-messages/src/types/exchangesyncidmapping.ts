/**
 * exchangesyncidmapping entity type
 */
export interface exchangesyncidmapping {
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  exchangeentryid?: string;
  exchangesyncidmappingid?: string;
  fromcrmchangetype?: number;
  isdeletedinexchange?: boolean;
  isunlinkedincrm?: boolean;
  itemsubject?: string;
  lastsyncerror?: string;
  lastsyncerrorcode?: number;
  lastsyncerroroccurredon?: string;
  modifiedon?: string;
  objectid?: string;
  objecttypecode?: number;
  retries?: number;
  tocrmchangetype?: number;
  userdecision?: number;
  versionnumber?: number;
}
