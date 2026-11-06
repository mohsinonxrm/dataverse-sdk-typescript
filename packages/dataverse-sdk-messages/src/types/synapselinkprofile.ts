import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * synapselinkprofile entity type
 */
export interface synapselinkprofile {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _datalakefolder_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  activationtime?: string;
  componentidunique?: string;
  componentstate?: number;
  copyattachments?: boolean;
  copyfiles?: boolean;
  createdon?: string;
  destinationsyncstate?: number;
  extendedproperties?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  profilestate?: number;
  profiletype?: number;
  profileupdatedtime?: string;
  profileversion?: string;
  snapshotstopersist?: number;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  synapselinkprofileid?: string;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
