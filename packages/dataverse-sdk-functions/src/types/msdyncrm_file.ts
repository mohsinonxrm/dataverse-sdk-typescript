import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyncrm_file entity type
 */
export interface msdyncrm_file {
  componentstate: number;
  iscustomizable: BooleanManagedProperty;
  _owningteam_value: string;
  versionnumber: number;
  _modifiedonbehalfby_value: string;
  msdyncrm_source: number;
  importsequencenumber: number;
  msdyncrm_mainimageid: string;
  createdon: string;
  msdyncrm_rethumbnail: boolean;
  overriddencreatedon: string;
  msdyncrm_filecontent: string;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  componentidunique: string;
  _createdonbehalfby_value: string;
  msdyncrm_filecontent_name: string;
  msdyncrm_cmsid: string;
  msdyncrm_mainimage: string;
  _modifiedby_value: string;
  msdyncrm_thumbnail_url: string;
  _owninguser_value: string;
  msdyncrm_mainimage_url: string;
  msdyncrm_alttext: string;
  _ownerid_value: string;
  msdyncrm_blobcdnuri: string;
  msdyncrm_height: number;
  ismanaged: boolean;
  msdyncrm_sastokenexpirationdate: string;
  msdyncrm_mainimage_timestamp: number;
  modifiedon: string;
  _owningbusinessunit_value: string;
  msdyncrm_contenttype: string;
  statecode: number;
  statuscode: number;
  msdyncrm_sastoken: string;
  msdyncrm_width: number;
  msdyncrm_blobsize: number;
  msdyncrm_fileid: string;
  _createdby_value: string;
  overwritetime: string;
  solutionid: string;
  msdyncrm_bloburi: string;
  msdyncrm_name: string;
  msdyncrm_copyurl: string;
  msdyncrm_category: string;
}
