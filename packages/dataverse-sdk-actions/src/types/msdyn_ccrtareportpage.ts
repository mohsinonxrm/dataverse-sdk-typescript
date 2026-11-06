import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ccrtareportpage entity type
 */
export interface msdyn_ccrtareportpage {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_reportid_value?: string;
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
  msdyn_basepagecontentversion?: string;
  msdyn_basepageid?: string;
  msdyn_basepageschemaversion?: number;
  msdyn_ccrtareportpageid?: string;
  msdyn_contentversion?: string;
  msdyn_layouttype?: string;
  msdyn_metadatafile?: string;
  msdyn_metadatafile_name?: string;
  msdyn_name?: string;
  msdyn_ordinal?: number;
  msdyn_schemaversion?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
