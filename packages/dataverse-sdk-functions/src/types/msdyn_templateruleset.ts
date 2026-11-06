import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_templateruleset entity type
 */
export interface msdyn_templateruleset {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_draftruleset_value?: string;
  _msdyn_publishedruleset_value?: string;
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
  msdyn_bulkoperationrunid?: string;
  msdyn_channel?: number;
  msdyn_channeltype?: number;
  msdyn_description?: string;
  msdyn_name?: string;
  msdyn_publishedon?: string;
  msdyn_templaterulesetid?: string;
  msdyn_type?: number;
  msdyn_uniquename?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
