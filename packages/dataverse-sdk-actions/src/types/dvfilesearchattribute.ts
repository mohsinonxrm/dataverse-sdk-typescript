import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * dvfilesearchattribute entity type
 */
export interface dvfilesearchattribute {
  _attribute_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _dvfilesearchentity_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  attributelogicalname?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  dvfilesearchattributeid?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  isfilterable?: boolean;
  ismanaged?: boolean;
  issearchable?: boolean;
  isvectorizable?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
