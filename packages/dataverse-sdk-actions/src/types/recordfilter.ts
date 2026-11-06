import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * recordfilter entity type
 */
export interface recordfilter {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  displayname?: string;
  fetchxml?: string;
  filterlinkedrecords?: boolean;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  isrolebusinessunitquery?: boolean;
  modifiedon?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  recordfilterid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
