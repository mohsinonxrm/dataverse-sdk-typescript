import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * card entity type
 */
export interface card {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  appdefinition?: string;
  cardid?: string;
  componentidunique?: string;
  componentstate?: number;
  coowners?: string;
  createdon?: string;
  description?: string;
  hiddentags?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  publishdate?: string;
  publishsourceid?: string;
  remixsourceid?: string;
  schemaversion?: string;
  sizes?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  tags?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
