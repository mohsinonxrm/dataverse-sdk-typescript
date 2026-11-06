import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * dvtablesearchattribute entity type
 */
export interface dvtablesearchattribute {
  _attribute_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _dvtablesearchentity_value?: string;
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
  dvtablesearchattributeid?: string;
  importsequencenumber?: number;
  isattributeenabledforvectorsearch?: boolean;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  isretrievable?: boolean;
  issearchable?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
