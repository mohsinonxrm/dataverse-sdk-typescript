/**
 * mspp_entitypermission entity type
 */
export interface mspp_entitypermission {
  _mspp_createdby_value?: string;
  _mspp_modifiedby_value?: string;
  _mspp_parententitypermission_value?: string;
  _mspp_websiteid_value?: string;
  mspp_accountrelationship?: string;
  mspp_append?: boolean;
  mspp_appendto?: boolean;
  mspp_contactrelationship?: string;
  mspp_create?: boolean;
  mspp_createdon?: string;
  mspp_delete?: boolean;
  mspp_entitylogicalname?: string;
  mspp_entityname?: string;
  mspp_entitypermissionid?: string;
  mspp_modifiedon?: string;
  mspp_parentrelationship?: string;
  mspp_permissionfetchxml?: string;
  mspp_read?: boolean;
  mspp_scope?: number;
  mspp_write?: boolean;
  statecode?: number;
  statuscode?: number;
}
