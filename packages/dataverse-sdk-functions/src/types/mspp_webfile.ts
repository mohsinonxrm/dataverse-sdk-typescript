/**
 * mspp_webfile entity type
 */
export interface mspp_webfile {
  _mspp_createdby_value?: string;
  _mspp_masterwebfileid_value?: string;
  _mspp_modifiedby_value?: string;
  _mspp_parentpageid_value?: string;
  _mspp_publishingstateid_value?: string;
  _mspp_websiteid_value?: string;
  mspp_alloworigin?: string;
  mspp_cloudblobaddress?: string;
  mspp_contentdisposition?: number;
  mspp_createdbyipaddress?: string;
  mspp_createdbyusername?: string;
  mspp_createdon?: string;
  mspp_displaydate?: string;
  mspp_displayorder?: number;
  mspp_excludefromsearch?: boolean;
  mspp_expirationdate?: string;
  mspp_hiddenfromsitemap?: boolean;
  mspp_modifiedbyipaddress?: string;
  mspp_modifiedbyusername?: string;
  mspp_modifiedon?: string;
  mspp_name?: string;
  mspp_partialurl?: string;
  mspp_releasedate?: string;
  mspp_summary?: string;
  mspp_title?: string;
  mspp_webfileid?: string;
  statecode?: number;
  statuscode?: number;
}
