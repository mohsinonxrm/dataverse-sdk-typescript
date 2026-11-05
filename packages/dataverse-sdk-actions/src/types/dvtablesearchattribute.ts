import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * dvtablesearchattribute entity type
 */
export interface dvtablesearchattribute {
  componentidunique?: string;
  _modifiedby_value?: string;
  solutionid?: string;
  _ownerid_value?: string;
  isretrievable?: boolean;
  timezoneruleversionnumber?: number;
  importsequencenumber?: number;
  _dvtablesearchentity_value?: string;
  modifiedon?: string;
  attributelogicalname?: string;
  _createdonbehalfby_value?: string;
  createdon?: string;
  _owningteam_value?: string;
  _modifiedonbehalfby_value?: string;
  issearchable?: boolean;
  overriddencreatedon?: string;
  _owningbusinessunit_value?: string;
  componentstate?: number;
  dvtablesearchattributeid?: string;
  utcconversiontimezonecode?: number;
  name?: string;
  _createdby_value?: string;
  _owninguser_value?: string;
  versionnumber?: number;
  statuscode?: number;
  isattributeenabledforvectorsearch?: boolean;
  _attribute_value?: string;
  ismanaged?: boolean;
  overwritetime?: string;
  iscustomizable?: BooleanManagedProperty;
  statecode?: number;
}
