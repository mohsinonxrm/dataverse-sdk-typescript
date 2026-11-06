import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_proactive_delivery_batch entity type
 */
export interface msdyn_proactive_delivery_batch {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_file_id_value?: string;
  _msdyn_proactive_engagement_config_value?: string;
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
  msdyn_batch_id?: string;
  msdyn_deliveries_created?: number;
  msdyn_delivery_creation_failures?: number;
  msdyn_error_code?: number;
  msdyn_error_message?: string;
  msdyn_file_format_errors?: number;
  msdyn_last_processed_line_index?: number;
  msdyn_proactive_delivery_batchid?: string;
  msdyn_status?: number;
  msdyn_total_lines_processed?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
