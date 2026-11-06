/**
 * msdyn_proactive_delivery_batch_error entity type
 */
export interface msdyn_proactive_delivery_batch_error {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_batch_id_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_batch_error_id?: string;
  msdyn_error_code?: number;
  msdyn_error_message?: string;
  msdyn_file_record?: string;
  msdyn_proactive_delivery_batch_errorid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
