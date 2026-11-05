import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * keyvaultreference entity type
 */
export interface keyvaultreference {
  timezoneruleversionnumber?: number;
  keyname?: string;
  isvalidated?: boolean;
  overwritetime?: string;
  componentidunique?: string;
  _owningbusinessunit_value?: string;
  _managedidentityid_value?: string;
  iscustomizable?: BooleanManagedProperty;
  createdon?: string;
  _createdonbehalfby_value?: string;
  preauthorizedapplicationtype?: number;
  versionnumber?: number;
  overriddencreatedon?: string;
  keyvaulturi?: string;
  _modifiedby_value?: string;
  modifiedon?: string;
  keytype?: number;
  _owninguser_value?: string;
  utcconversiontimezonecode?: number;
  _ownerid_value?: string;
  ismanaged?: boolean;
  statecode?: number;
  _owningteam_value?: string;
  importsequencenumber?: number;
  keyvaultreferenceid?: string;
  componentstate?: number;
  _modifiedonbehalfby_value?: string;
  _createdby_value?: string;
  solutionid?: string;
  statuscode?: number;
}
