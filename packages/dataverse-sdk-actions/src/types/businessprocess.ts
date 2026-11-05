import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * businessprocess entity type
 */
export interface businessprocess {
  versionnumber?: number;
  modifiedon?: string;
  createdon?: string;
  solutionid?: string;
  _modifiedonbehalfby_value?: string;
  _owningteam_value?: string;
  processingcontext?: string;
  statuscode?: number;
  overwritetime?: string;
  componentstate?: number;
  statecode?: number;
  _owninguser_value?: string;
  _rootworkflowid_value?: string;
  processmapversion?: number;
  _createdonbehalfby_value?: string;
  overriddencreatedon?: string;
  timezoneruleversionnumber?: number;
  _owningbusinessunit_value?: string;
  ismanaged?: boolean;
  utcconversiontimezonecode?: number;
  _ownerid_value?: string;
  processmap?: string;
  _modifiedby_value?: string;
  processmapcreatedon?: string;
  componentidunique?: string;
  iscustomizable?: BooleanManagedProperty;
  processmapstatus?: number;
  businessprocessid?: string;
  name?: string;
  description?: string;
  importsequencenumber?: number;
  _createdby_value?: string;
}
