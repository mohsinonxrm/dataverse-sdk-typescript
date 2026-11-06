import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * skill entity type
 */
export interface skill {
  _approverid_value?: string;
  _changesetid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _creatorid_value?: string;
  _evalresultid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _parentskillid_value?: string;
  approvercomments?: string;
  body?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  creatorcomments?: string;
  description?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ishidden?: boolean;
  ismanaged?: boolean;
  ispersonal?: boolean;
  modifiedon?: string;
  name?: string;
  origin?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  revisionid?: string;
  skillid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  targetrevisionid?: string;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  version?: string;
  versionnumber?: number;
}
