/**
 * msdyn_customerassetattachment entity type
 */
export interface msdyn_customerassetattachment {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_customerasset_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_attachmenttype?: number;
  msdyn_category?: number;
  msdyn_customerassetattachmentid?: string;
  msdyn_file?: string;
  msdyn_file_name?: string;
  msdyn_image?: string;
  msdyn_image_timestamp?: number;
  msdyn_image_url?: string;
  msdyn_imageid?: string;
  msdyn_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
