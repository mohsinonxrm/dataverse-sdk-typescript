import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdynmkt_eventparametermetadata entity type
 */
export interface msdynmkt_eventparametermetadata {
  solutionid?: string;
  _createdonbehalfby_value?: string;
  timezoneruleversionnumber?: number;
  _owninguser_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  componentstate?: number;
  _msdynmkt_customapirequestparameterid_value?: string;
  iscustomizable?: BooleanManagedProperty;
  msdynmkt_type?: number;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _createdby_value?: string;
  importsequencenumber?: number;
  overwritetime?: string;
  statecode?: number;
  overriddencreatedon?: string;
  utcconversiontimezonecode?: number;
  createdon?: string;
  componentidunique?: string;
  msdynmkt_uniquename?: string;
  _owningteam_value?: string;
  msdynmkt_eventparametermetadataid?: string;
  modifiedon?: string;
  versionnumber?: number;
  ismanaged?: boolean;
  msdynmkt_cdpajson?: string;
  msdynmkt_name?: string;
  statuscode?: number;
}
