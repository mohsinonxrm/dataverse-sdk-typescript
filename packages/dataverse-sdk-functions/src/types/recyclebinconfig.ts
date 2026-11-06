import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * recyclebinconfig entity type
 */
export interface recyclebinconfig {
  _createdonbehalfby_value?: string;
  _createdby_value?: string;
  _organizationid_value?: string;
  importsequencenumber?: number;
  _extensionofrecordid_value?: string;
  bintablename?: string;
  solutionid?: string;
  utcconversiontimezonecode?: number;
  timezoneruleversionnumber?: number;
  cleanupintervalindays?: number;
  name?: string;
  overwritetime?: string;
  createdon?: string;
  isreadyforrecyclebin?: boolean;
  modifiedon?: string;
  componentstate?: number;
  overriddencreatedon?: string;
  recyclebinconfigid?: string;
  componentidunique?: string;
  _modifiedonbehalfby_value?: string;
  _modifiedby_value?: string;
  versionnumber?: number;
  ismanaged?: boolean;
  statecode?: number;
  statuscode?: number;
  iscustomizable?: BooleanManagedProperty;
}
