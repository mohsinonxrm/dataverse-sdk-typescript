import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyncrm_file entity type
 */
export interface msdyncrm_file {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
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
  msdyncrm_alttext?: string;
  msdyncrm_blobcdnuri?: string;
  msdyncrm_blobsize?: number;
  msdyncrm_bloburi?: string;
  msdyncrm_category?: string;
  msdyncrm_cmsid?: string;
  msdyncrm_contenttype?: string;
  msdyncrm_copyurl?: string;
  msdyncrm_filecontent?: string;
  msdyncrm_filecontent_name?: string;
  msdyncrm_fileid?: string;
  msdyncrm_height?: number;
  msdyncrm_mainimage?: string;
  msdyncrm_mainimage_timestamp?: number;
  msdyncrm_mainimage_url?: string;
  msdyncrm_mainimageid?: string;
  msdyncrm_name?: string;
  msdyncrm_publicaccess?: number;
  msdyncrm_rethumbnail?: boolean;
  msdyncrm_sastoken?: string;
  msdyncrm_sastokenexpirationdate?: string;
  msdyncrm_source?: number;
  msdyncrm_thumbnail_url?: string;
  msdyncrm_width?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
