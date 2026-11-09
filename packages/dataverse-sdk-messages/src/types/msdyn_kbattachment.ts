/**
 * msdyn_kbattachment entity type
 */
export interface msdyn_kbattachment {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_fileattachment?: string;
  msdyn_fileattachment_name?: string;
  msdyn_fileicon?: string;
  msdyn_fileicon_timestamp?: number;
  msdyn_fileicon_url?: string;
  msdyn_fileiconid?: string;
  msdyn_filename?: string;
  msdyn_filesize?: number;
  msdyn_filetype?: string;
  msdyn_kbattachmentid?: string;
  msdyn_relatedannotations?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
