import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evaluationlocalizedcontent entity type
 */
export interface msdyn_evaluationlocalizedcontent {
  importsequencenumber?: number;
  statuscode?: number;
  _owningteam_value?: string;
  _owningbusinessunit_value?: string;
  _modifiedby_value?: string;
  modifiedon?: string;
  versionnumber?: number;
  componentidunique?: string;
  overwritetime?: string;
  statecode?: number;
  ismanaged?: boolean;
  msdyn_content?: string;
  iscustomizable?: BooleanManagedProperty;
  createdon?: string;
  timezoneruleversionnumber?: number;
  overriddencreatedon?: string;
  componentstate?: number;
  msdyn_languagecode?: number;
  _modifiedonbehalfby_value?: string;
  _owninguser_value?: string;
  msdyn_metadataid?: string;
  solutionid?: string;
  msdyn_evaluationlocalizedcontentid?: string;
  _ownerid_value?: string;
  _createdonbehalfby_value?: string;
  utcconversiontimezonecode?: number;
  _createdby_value?: string;
}
