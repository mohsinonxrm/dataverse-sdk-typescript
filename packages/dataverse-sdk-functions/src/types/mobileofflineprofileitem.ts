/**
 * mobileofflineprofileitem entity type
 */
export interface mobileofflineprofileitem {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _regardingobjectid_value?: string;
  componentstate?: number;
  createdon?: string;
  entityobjecttypecode?: number;
  introducedversion?: string;
  ismanaged?: boolean;
  isvalidated?: boolean;
  isvisibleingrid?: boolean;
  mobileofflineprofileitemid?: string;
  mobileofflineprofileitemidunique?: string;
  modifiedon?: string;
  name?: string;
  overwritetime?: string;
  processid?: string;
  profileitementityfilter?: string;
  publishedon?: string;
  recorddistributioncriteria?: number;
  recordsownedbyme?: boolean;
  recordsownedbymybusinessunit?: boolean;
  recordsownedbymyteam?: boolean;
  relationshipdata?: string;
  selectedcolumns?: string;
  selectedentitymetadata?: string;
  selectedentitytypecode?: string;
  solutionid?: string;
  stageid?: string;
  syncintervalinminutes?: number;
  traversedpath?: string;
  versionnumber?: number;
}
