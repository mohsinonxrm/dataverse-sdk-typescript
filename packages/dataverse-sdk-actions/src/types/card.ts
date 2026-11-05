import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * card entity type
 */
export interface card {
  _createdonbehalfby_value?: string;
  componentstate?: number;
  description?: string;
  cardid?: string;
  sizes?: string;
  timezoneruleversionnumber?: number;
  publishdate?: string;
  solutionid?: string;
  tags?: string;
  statecode?: number;
  statuscode?: number;
  createdon?: string;
  appdefinition?: string;
  schemaversion?: string;
  overwritetime?: string;
  importsequencenumber?: number;
  coowners?: string;
  ismanaged?: boolean;
  remixsourceid?: string;
  utcconversiontimezonecode?: number;
  _modifiedonbehalfby_value?: string;
  _modifiedby_value?: string;
  _owningbusinessunit_value?: string;
  hiddentags?: string;
  overriddencreatedon?: string;
  name?: string;
  _owningteam_value?: string;
  _ownerid_value?: string;
  _owninguser_value?: string;
  _createdby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  modifiedon?: string;
  versionnumber?: number;
  componentidunique?: string;
  publishsourceid?: string;
}
