import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * synapsedatabase entity type
 */
export interface synapsedatabase {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _datalakefolder_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  databasename?: string;
  developmentendpoint?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  lakehouseconnectionid?: string;
  lakehouseid?: string;
  lakehouseworkspaceid?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  resourcegroup?: string;
  schemaprefix?: string;
  serverlesssqlendpoint?: string;
  solutionid?: string;
  sparkpoolconfig?: string;
  statecode?: number;
  statuscode?: number;
  subscription?: string;
  synapsedatabaseid?: string;
  tenant?: string;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  workspacename?: string;
}
