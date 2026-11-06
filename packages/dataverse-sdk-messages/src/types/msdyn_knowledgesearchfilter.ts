import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_knowledgesearchfilter entity type
 */
export interface msdyn_knowledgesearchfilter {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
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
  msdyn_attributename?: string;
  msdyn_defaultvalues?: string;
  msdyn_enabled?: boolean;
  msdyn_entityname?: string;
  msdyn_iscustom?: boolean;
  msdyn_knowledgesearchfilterid?: string;
  msdyn_name?: string;
  msdyn_orderid?: number;
  msdyn_selectedvalues?: string;
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
