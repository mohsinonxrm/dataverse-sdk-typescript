import type { BooleanManagedProperty } from './BooleanManagedProperty.js';

/**
 * businessprocess entity type
 */
export interface businessprocess {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _rootworkflowid_value?: string;
  businessprocessid?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  processingcontext?: string;
  processmap?: string;
  processmapcreatedon?: string;
  processmapstatus?: number;
  processmapversion?: number;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
