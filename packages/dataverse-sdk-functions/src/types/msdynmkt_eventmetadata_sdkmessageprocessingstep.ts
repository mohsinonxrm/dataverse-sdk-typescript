import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdynmkt_eventmetadata_sdkmessageprocessingstep entity type
 */
export interface msdynmkt_eventmetadata_sdkmessageprocessingstep {
  statuscode?: number;
  importsequencenumber?: number;
  msdynmkt_name?: string;
  msdynmkt_uniquename?: string;
  overriddencreatedon?: string;
  _organizationid_value?: string;
  solutionid?: string;
  _modifiedby_value?: string;
  componentidunique?: string;
  _createdonbehalfby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  utcconversiontimezonecode?: number;
  timezoneruleversionnumber?: number;
  componentstate?: number;
  _msdynmkt_sdkmessageprocessingstepid_value?: string;
  ismanaged?: boolean;
  msdynmkt_eventmetadata_sdkmessageprocessingstepid?: string;
  statecode?: number;
  _createdby_value?: string;
  modifiedon?: string;
  overwritetime?: string;
  versionnumber?: number;
  _modifiedonbehalfby_value?: string;
  createdon?: string;
  _msdynmkt_eventmetadataid_value?: string;
}
