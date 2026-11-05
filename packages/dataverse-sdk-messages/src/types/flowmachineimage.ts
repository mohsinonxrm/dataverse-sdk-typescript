import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * flowmachineimage entity type
 */
export interface flowmachineimage {
  versionnumber?: number;
  solutionid?: string;
  utcconversiontimezonecode?: number;
  _ownerid_value?: string;
  timezoneruleversionnumber?: number;
  description?: string;
  iscustomizable?: BooleanManagedProperty;
  importsequencenumber?: number;
  overriddencreatedon?: string;
  componentstate?: number;
  _owninguser_value?: string;
  componentidunique?: string;
  createdon?: string;
  overwritetime?: string;
  _modifiedby_value?: string;
  deprecationdate?: string;
  modifiedon?: string;
  ismanaged?: boolean;
  _owningbusinessunit_value?: string;
  source?: number;
  endofsupportdate?: string;
  statuscode?: number;
  _owningteam_value?: string;
  statecode?: number;
  _createdonbehalfby_value?: string;
  flowmachineimageid?: string;
  name?: string;
  _createdby_value?: string;
  _modifiedonbehalfby_value?: string;
}
