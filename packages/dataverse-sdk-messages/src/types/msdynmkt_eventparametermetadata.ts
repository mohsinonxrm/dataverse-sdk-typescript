import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdynmkt_eventparametermetadata entity type
 */
export interface msdynmkt_eventparametermetadata {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdynmkt_customapirequestparameterid_value?: string;
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
  msdynmkt_cdpajson?: string;
  msdynmkt_eventparametermetadataid?: string;
  msdynmkt_name?: string;
  msdynmkt_type?: number;
  msdynmkt_uniquename?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
