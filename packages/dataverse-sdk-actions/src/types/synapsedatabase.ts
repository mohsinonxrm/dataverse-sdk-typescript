import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * synapsedatabase entity type
 */
export interface synapsedatabase {
  _createdonbehalfby_value?: string;
  sparkpoolconfig?: string;
  componentidunique?: string;
  componentstate?: number;
  versionnumber?: number;
  ismanaged?: boolean;
  name?: string;
  resourcegroup?: string;
  synapsedatabaseid?: string;
  utcconversiontimezonecode?: number;
  databasename?: string;
  lakehouseworkspaceid?: string;
  _createdby_value?: string;
  _datalakefolder_value?: string;
  lakehouseid?: string;
  schemaprefix?: string;
  solutionid?: string;
  _owningbusinessunit_value?: string;
  _ownerid_value?: string;
  statuscode?: number;
  tenant?: string;
  _modifiedby_value?: string;
  modifiedon?: string;
  subscription?: string;
  workspacename?: string;
  createdon?: string;
  lakehouseconnectionid?: string;
  uniquename?: string;
  overriddencreatedon?: string;
  importsequencenumber?: number;
  overwritetime?: string;
  _modifiedonbehalfby_value?: string;
  _owninguser_value?: string;
  developmentendpoint?: string;
  statecode?: number;
  serverlesssqlendpoint?: string;
  timezoneruleversionnumber?: number;
  _owningteam_value?: string;
  iscustomizable?: BooleanManagedProperty;
}
