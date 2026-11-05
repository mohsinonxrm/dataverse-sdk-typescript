import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdynmkt_catalogeventstatusconfiguration entity type
 */
export interface msdynmkt_catalogeventstatusconfiguration {
  componentstate?: number;
  componentidunique?: string;
  msdynmkt_name?: string;
  versionnumber?: number;
  overwritetime?: string;
  iscustomizable?: BooleanManagedProperty;
  statecode?: number;
  overriddencreatedon?: string;
  ismanaged?: boolean;
  createdon?: string;
  _modifiedonbehalfby_value?: string;
  timezoneruleversionnumber?: number;
  _modifiedby_value?: string;
  _createdonbehalfby_value?: string;
  _owningteam_value?: string;
  _owningbusinessunit_value?: string;
  _msdynmkt_catalogid_value?: string;
  _createdby_value?: string;
  msdynmkt_catalogeventstatusconfigurationid?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  statuscode?: number;
  solutionid?: string;
  msdynmkt_iconwebresourceid?: string;
  msdynmkt_uniquename?: string;
  msdynmkt_eventmetadatastatus?: number;
  _owninguser_value?: string;
  _ownerid_value?: string;
  utcconversiontimezonecode?: number;
}
