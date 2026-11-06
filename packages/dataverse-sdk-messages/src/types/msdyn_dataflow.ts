import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataflow entity type
 */
export interface msdyn_dataflow {
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
  msdyn_dataflowid?: string;
  msdyn_description?: string;
  msdyn_destinationadls?: string;
  msdyn_emailsettings?: string;
  msdyn_gatewayobjectid?: string;
  msdyn_internalversion?: string;
  msdyn_mashupdocument?: string;
  msdyn_mashupsettings?: string;
  msdyn_name?: string;
  msdyn_originaldataflowid?: string;
  msdyn_refreshhistory?: string;
  msdyn_refreshsettings?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
