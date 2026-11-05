import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * businessprocesslinkedartifact entity type
 */
export interface businessprocesslinkedartifact {
  solutionid?: string;
  importsequencenumber?: number;
  name?: string;
  _planartifact_value?: string;
  artifacttype?: string;
  modifiedon?: string;
  ismanaged?: boolean;
  _businessprocess_value?: string;
  componentstate?: number;
  _owningbusinessunit_value?: string;
  overriddencreatedon?: string;
  timezoneruleversionnumber?: number;
  iscustomizable?: BooleanManagedProperty;
  _modifiedby_value?: string;
  _owningteam_value?: string;
  overwritetime?: string;
  _planlink_value?: string;
  businessprocesslinkedartifactid?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  createdon?: string;
  _owninguser_value?: string;
  _createdby_value?: string;
  componentidunique?: string;
  artifactid?: string;
  _createdonbehalfby_value?: string;
  statuscode?: number;
  statecode?: number;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
}
