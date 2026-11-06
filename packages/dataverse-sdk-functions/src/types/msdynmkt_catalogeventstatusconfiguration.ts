import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdynmkt_catalogeventstatusconfiguration entity type
 */
export interface msdynmkt_catalogeventstatusconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdynmkt_catalogid_value?: string;
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
  msdynmkt_catalogeventstatusconfigurationid?: string;
  msdynmkt_eventmetadatastatus?: number;
  msdynmkt_iconwebresourceid?: string;
  msdynmkt_name?: string;
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
