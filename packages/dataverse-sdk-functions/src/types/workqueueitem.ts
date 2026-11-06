import type { BooleanManagedProperty } from './BooleanManagedProperty.js';

/**
 * workqueueitem entity type
 */
export interface workqueueitem {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _processinguser_value?: string;
  _workqueueid_value?: string;
  completedon?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  delayuntil?: string;
  executioncontext?: string;
  expirydate?: string;
  importsequencenumber?: number;
  input?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  latestflowrunid?: string;
  machineuser?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  priority?: number;
  processingduration?: number;
  processingresult?: string;
  processingstarttime?: string;
  processorid?: string;
  processortype?: number;
  requeuecount?: number;
  retrycount?: number;
  slastatus?: number;
  slathresholddate?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uniqueidbyqueue?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  workqueueitemid?: string;
}
