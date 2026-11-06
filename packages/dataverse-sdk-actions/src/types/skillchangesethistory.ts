import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * skillchangesethistory entity type
 */
export interface skillchangesethistory {
  _approvedby_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _submittedby_value?: string;
  approvedon?: string;
  cancelledon?: string;
  changemanifest?: string;
  changemanifest_name?: string;
  changesetcomments?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  evalsummary?: string;
  evalsummary_name?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  rejectedon?: string;
  reviewstatus?: number;
  skillchangesethistoryid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  submittedon?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
