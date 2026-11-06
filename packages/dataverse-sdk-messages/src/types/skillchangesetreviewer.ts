import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * skillchangesetreviewer entity type
 */
export interface skillchangesetreviewer {
  _changesetid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _reviewerid_value?: string;
  assignmentstatus?: number;
  completedon?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  notificationerror?: string;
  notificationstatus?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  skillchangesetreviewerid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  viewedon?: string;
}
