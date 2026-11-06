/**
 * msdyn_richtextfile entity type
 */
export interface msdyn_richtextfile {
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
  msdyn_fileblob?: string;
  msdyn_fileblob_name?: string;
  msdyn_imageblob?: string;
  msdyn_imageblob_timestamp?: number;
  msdyn_imageblob_url?: string;
  msdyn_imageblobid?: string;
  msdyn_name?: string;
  msdyn_parententity_fieldname?: string;
  msdyn_parententityname?: string;
  msdyn_parentid?: string;
  msdyn_richtextfileid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
