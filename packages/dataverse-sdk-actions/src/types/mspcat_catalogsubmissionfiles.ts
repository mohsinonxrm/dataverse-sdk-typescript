/**
 * mspcat_catalogsubmissionfiles entity type
 */
export interface mspcat_catalogsubmissionfiles {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _mspcat_packagestore_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  mspcat_catalogsubmissionfilesid?: string;
  mspcat_description?: string;
  mspcat_file?: string;
  mspcat_file_name?: string;
  mspcat_filetype?: number;
  mspcat_imagesize?: number;
  mspcat_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
