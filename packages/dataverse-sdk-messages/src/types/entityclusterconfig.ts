import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * entityclusterconfig entity type
 */
export interface entityclusterconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _extensionofrecordid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  clustermode?: number;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  defaulttolocalpartition?: boolean;
  entityclusterconfigid?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  shouldautoreplicate?: boolean;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
