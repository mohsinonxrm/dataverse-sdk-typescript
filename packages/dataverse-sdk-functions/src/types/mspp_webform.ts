/**
 * mspp_webform entity type
 */
export interface mspp_webform {
  _mspp_createdby_value?: string;
  _mspp_modifiedby_value?: string;
  _mspp_startstep_value?: string;
  _mspp_websiteid_value?: string;
  mspp_authenticationrequired?: boolean;
  mspp_createdon?: string;
  mspp_editexistingrecordpermitted?: boolean;
  mspp_editexpiredmessage?: string;
  mspp_editexpiredstatecode?: number;
  mspp_editexpiredstatuscode?: number;
  mspp_editnotpermittedmessage?: string;
  mspp_modifiedon?: string;
  mspp_multiplerecordsperuserpermitted?: boolean;
  mspp_name?: string;
  mspp_progressindicatorenabled?: boolean;
  mspp_progressindicatorignorelaststep?: boolean;
  mspp_progressindicatorposition?: number;
  mspp_progressindicatorprependstepnum?: boolean;
  mspp_progressindicatortype?: number;
  mspp_provisionedlanguages?: number;
  mspp_savechangeswarningmessage?: string;
  mspp_savechangeswarningonclose?: boolean;
  mspp_startnewsessiononload?: boolean;
  mspp_webformid?: string;
  statecode?: number;
  statuscode?: number;
}
