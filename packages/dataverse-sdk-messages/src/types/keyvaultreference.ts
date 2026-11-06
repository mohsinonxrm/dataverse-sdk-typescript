import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * keyvaultreference entity type
 */
export interface keyvaultreference {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _managedidentityid_value?: string;
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
  isvalidated?: boolean;
  keyname?: string;
  keytype?: number;
  keyvaultreferenceid?: string;
  keyvaulturi?: string;
  modifiedon?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  preauthorizedapplicationtype?: number;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
