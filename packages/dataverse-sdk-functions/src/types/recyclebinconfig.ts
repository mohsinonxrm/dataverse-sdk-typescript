import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * recyclebinconfig entity type
 */
export interface recyclebinconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _extensionofrecordid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  bintablename?: string;
  cleanupintervalindays?: number;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  isreadyforrecyclebin?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  recyclebinconfigid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
