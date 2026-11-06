import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * workflowbinary entity type
 */
export interface workflowbinary {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _flowsessionid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _process_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  data?: string;
  data_name?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  metadata?: string;
  mimetype?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  reference?: string;
  referencename?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  type?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  workflowbinaryid?: string;
}
