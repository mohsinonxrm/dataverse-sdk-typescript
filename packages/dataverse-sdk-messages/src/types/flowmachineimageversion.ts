import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * flowmachineimageversion entity type
 */
export interface flowmachineimageversion {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _flowmachineimage_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _sourcemachineid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  flowmachineimageversionid?: string;
  generalizationlogs?: string;
  generalizationlogs_name?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  provisioningerror?: string;
  reference?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  statuserrormessage?: string;
  supportedscenario?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  version?: string;
  versionnumber?: number;
}
