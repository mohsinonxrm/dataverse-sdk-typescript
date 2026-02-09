import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * workqueue entity type
 */
export interface workqueue {
  description: string;
  itemmaxretrycount: number;
  versionnumber: number;
  _modifiedonbehalfby_value: string;
  defaultitemtimetoliveinminutes: number;
  continueprocessingifslaviolated: number;
  slathresholdmodifiedon: string;
  timezoneruleversionnumber: number;
  _createdonbehalfby_value: string;
  _createdby_value: string;
  statecode: number;
  prioritytype: number;
  componentidunique: string;
  inputschematype: number;
  _owningbusinessunit_value: string;
  workqueueid: string;
  componentstate: number;
  overriddencreatedon: string;
  utcconversiontimezonecode: number;
  createdon: string;
  importsequencenumber: number;
  itemmaxrequeuecount: number;
  inputschema: string;
  workqueuetype: number;
  name: string;
  _ownerid_value: string;
  _owninguser_value: string;
  modifiedon: string;
  overwritetime: string;
  solutionid: string;
  ismanaged: boolean;
  iscustomizable: BooleanManagedProperty;
  allowupdateinputwhileprocessing: number;
  statuscode: number;
  workqueuekey: string;
  slathresholdinpercentage: number;
  _owningteam_value: string;
  _modifiedby_value: string;
}
