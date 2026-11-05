import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmprocesstemplate entity type
 */
export interface msdyn_pmprocesstemplate {
  utcconversiontimezonecode?: number;
  componentidunique?: string;
  msdyn_processminingmetadataconfig?: string;
  _ownerid_value?: string;
  _createdby_value?: string;
  timezoneruleversionnumber?: number;
  _owningbusinessunit_value?: string;
  overriddencreatedon?: string;
  msdyn_processmashupscript?: string;
  componentstate?: number;
  _msdyn_pminferredtaskid_value?: string;
  createdon?: string;
  modifiedon?: string;
  msdyn_name?: string;
  _modifiedby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  _modifiedonbehalfby_value?: string;
  statecode?: number;
  statuscode?: number;
  _owninguser_value?: string;
  importsequencenumber?: number;
  ismanaged?: boolean;
  solutionid?: string;
  overwritetime?: string;
  _createdonbehalfby_value?: string;
  _owningteam_value?: string;
  msdyn_processdataflowconfig?: string;
  msdyn_pmprocesstemplateid?: string;
  versionnumber?: number;
}
