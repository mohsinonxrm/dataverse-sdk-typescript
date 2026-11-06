import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_knowledgemanagementsetting entity type
 */
export interface msdyn_knowledgemanagementsetting {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_actionlist?: string;
  msdyn_autosuggestionfield?: string;
  msdyn_defaultemailrecipient?: string;
  msdyn_entityname?: string;
  msdyn_isautosuggestionsenabled?: boolean;
  msdyn_knowledgemanagementsettingid?: string;
  msdyn_showcontextualactions?: boolean;
  msdyn_status?: number;
  msdyn_uniquename?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
