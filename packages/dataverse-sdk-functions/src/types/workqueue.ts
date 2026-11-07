import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * workqueue entity type
 */
export interface workqueue {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  allowupdateinputwhileprocessing?: number;
  componentidunique?: string;
  componentstate?: number;
  continueprocessingifslaviolated?: number;
  createdon?: string;
  defaultitemtimetoliveinminutes?: number;
  description?: string;
  importsequencenumber?: number;
  inputschema?: string;
  inputschematype?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  itemmaxrequeuecount?: number;
  itemmaxretrycount?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  prioritytype?: number;
  slathresholdinpercentage?: number;
  slathresholdmodifiedon?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  workqueueid?: string;
  workqueuekey?: string;
  workqueuetype?: number;
}
