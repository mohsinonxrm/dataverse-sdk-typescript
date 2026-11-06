/**
 * connection entity type
 */
export interface connection {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _record1id_value?: string;
  _record1roleid_value?: string;
  _record2id_value?: string;
  _record2roleid_value?: string;
  _relatedconnectionid_value?: string;
  _transactioncurrencyid_value?: string;
  connectionid?: string;
  createdon?: string;
  description?: string;
  effectiveend?: string;
  effectivestart?: string;
  entityimage?: string;
  entityimage_timestamp?: number;
  entityimage_url?: string;
  entityimageid?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  ismaster?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  record1objecttypecode?: number;
  record2objecttypecode?: number;
  statecode?: number;
  statuscode?: number;
  versionnumber?: number;
}
