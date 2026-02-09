/**
 * mspp_webrole entity type
 */
export interface mspp_webrole {
  mspp_webroleid: string;
  _mspp_websiteid_value: string;
  mspp_description: string;
  _mspp_modifiedby_value: string;
  _mspp_createdby_value: string;
  mspp_modifiedon: string;
  mspp_authenticatedusersrole: boolean;
  mspp_createdon: string;
  mspp_anonymoususersrole: boolean;
  statecode: number;
  statuscode: number;
  mspp_key: string;
  mspp_name: string;
}
