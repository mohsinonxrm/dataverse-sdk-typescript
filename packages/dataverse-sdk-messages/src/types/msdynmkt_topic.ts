import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdynmkt_topic entity type
 */
export interface msdynmkt_topic {
  importsequencenumber?: number;
  _modifiedby_value?: string;
  statecode?: number;
  ismanaged?: boolean;
  componentstate?: number;
  modifiedon?: string;
  _owningteam_value?: string;
  versionnumber?: number;
  _owninguser_value?: string;
  _msdynmkt_purposeid_value?: string;
  msdynmkt_topicid?: string;
  overriddencreatedon?: string;
  _createdonbehalfby_value?: string;
  overwritetime?: string;
  iscustomizable?: BooleanManagedProperty;
  _owningbusinessunit_value?: string;
  msdynmkt_name?: string;
  _modifiedonbehalfby_value?: string;
  utcconversiontimezonecode?: number;
  solutionid?: string;
  componentidunique?: string;
  timezoneruleversionnumber?: number;
  createdon?: string;
  _ownerid_value?: string;
  _createdby_value?: string;
  statuscode?: number;
}
