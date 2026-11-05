import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * synapselinkprofile entity type
 */
export interface synapselinkprofile {
  importsequencenumber?: number;
  componentstate?: number;
  modifiedon?: string;
  versionnumber?: number;
  profilestate?: number;
  copyattachments?: boolean;
  profiletype?: number;
  utcconversiontimezonecode?: number;
  profileupdatedtime?: string;
  ismanaged?: boolean;
  componentidunique?: string;
  statuscode?: number;
  copyfiles?: boolean;
  _datalakefolder_value?: string;
  _organizationid_value?: string;
  overriddencreatedon?: string;
  solutionid?: string;
  statecode?: number;
  _modifiedonbehalfby_value?: string;
  uniquename?: string;
  activationtime?: string;
  _createdby_value?: string;
  snapshotstopersist?: number;
  timezoneruleversionnumber?: number;
  overwritetime?: string;
  destinationsyncstate?: number;
  _modifiedby_value?: string;
  profileversion?: string;
  synapselinkprofileid?: string;
  createdon?: string;
  iscustomizable?: BooleanManagedProperty;
  name?: string;
  _createdonbehalfby_value?: string;
  extendedproperties?: string;
}
