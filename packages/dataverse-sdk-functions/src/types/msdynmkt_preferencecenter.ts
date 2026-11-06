import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdynmkt_preferencecenter entity type
 */
export interface msdynmkt_preferencecenter {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdynmkt_complianceid_value?: string;
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
  msdynmkt_designerhtml?: string;
  msdynmkt_errormessage?: string;
  msdynmkt_formhtml?: string;
  msdynmkt_isdefault?: boolean;
  msdynmkt_name?: string;
  msdynmkt_preferencecenterid?: string;
  msdynmkt_successmessage?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
