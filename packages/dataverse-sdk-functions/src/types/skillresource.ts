import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * skillresource entity type
 */
export interface skillresource {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _skillid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  filecontent?: string;
  filecontent_name?: string;
  filename?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  owneridtype?: string;
  skillresourceid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
