import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdynmkt_preferencecenter entity type
 */
export interface msdynmkt_preferencecenter {
  componentidunique?: string;
  statuscode?: number;
  _msdynmkt_complianceid_value?: string;
  iscustomizable?: BooleanManagedProperty;
  _modifiedby_value?: string;
  msdynmkt_successmessage?: string;
  _modifiedonbehalfby_value?: string;
  _createdby_value?: string;
  versionnumber?: number;
  _owningbusinessunit_value?: string;
  overwritetime?: string;
  msdynmkt_isdefault?: boolean;
  _ownerid_value?: string;
  modifiedon?: string;
  componentstate?: number;
  ismanaged?: boolean;
  msdynmkt_designerhtml?: string;
  overriddencreatedon?: string;
  createdon?: string;
  _createdonbehalfby_value?: string;
  importsequencenumber?: number;
  msdynmkt_preferencecenterid?: string;
  msdynmkt_name?: string;
  statecode?: number;
  msdynmkt_errormessage?: string;
  solutionid?: string;
  msdynmkt_formhtml?: string;
  utcconversiontimezonecode?: number;
  _owningteam_value?: string;
  _owninguser_value?: string;
  timezoneruleversionnumber?: number;
}
