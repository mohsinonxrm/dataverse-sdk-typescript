import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * workqueueitem entity type
 */
export interface workqueueitem {
  _createdby_value: string;
  importsequencenumber: number;
  _ownerid_value: string;
  _owningbusinessunit_value: string;
  uniqueidbyqueue: string;
  processorid: string;
  _modifiedby_value: string;
  modifiedon: string;
  componentidunique: string;
  createdon: string;
  priority: number;
  retrycount: number;
  processortype: number;
  name: string;
  input: string;
  statuscode: number;
  processingresult: string;
  utcconversiontimezonecode: number;
  componentstate: number;
  iscustomizable: BooleanManagedProperty;
  delayuntil: string;
  statecode: number;
  slathresholddate: string;
  workqueueitemid: string;
  expirydate: string;
  overwritetime: string;
  overriddencreatedon: string;
  _createdonbehalfby_value: string;
  requeuecount: number;
  ismanaged: boolean;
  _owninguser_value: string;
  versionnumber: number;
  solutionid: string;
  _processinguser_value: string;
  _modifiedonbehalfby_value: string;
  _workqueueid_value: string;
  completedon: string;
  executioncontext: string;
  _owningteam_value: string;
  processingstarttime: string;
  timezoneruleversionnumber: number;
  slastatus: number;
  processingduration: number;
  machineuser: string;
}
