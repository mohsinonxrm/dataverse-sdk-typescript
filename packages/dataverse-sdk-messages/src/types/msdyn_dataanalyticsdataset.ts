import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataanalyticsdataset entity type
 */
export interface msdyn_dataanalyticsdataset {
  _msdyn_parentdatasetid_value?: string;
  _modifiedby_value?: string;
  _owninguser_value?: string;
  _createdby_value?: string;
  _msdyn_datainsightsandanalyticsfeatureid_value?: string;
  versionnumber?: number;
  componentidunique?: string;
  ismanaged?: boolean;
  createdon?: string;
  overwritetime?: string;
  msdyn_name?: string;
  componentstate?: number;
  solutionid?: string;
  overriddencreatedon?: string;
  iscustomizable?: BooleanManagedProperty;
  statecode?: number;
  _ownerid_value?: string;
  msdyn_dataanalyticsdatasetid?: string;
  _owningteam_value?: string;
  importsequencenumber?: number;
  msdyn_datasettype?: number;
  msdyn_datasetid?: string;
  _modifiedonbehalfby_value?: string;
  modifiedon?: string;
  _owningbusinessunit_value?: string;
  _createdonbehalfby_value?: string;
  _msdyn_dataanalyticsworkspaceid_value?: string;
  statuscode?: number;
  utcconversiontimezonecode?: number;
  timezoneruleversionnumber?: number;
}
