import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * datalakefolder entity type
 */
export interface datalakefolder {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _parentfolderid_value?: string;
  accesstype?: string;
  cdmpath?: string;
  compliancelakelocation?: string;
  componentidunique?: string;
  componentstate?: number;
  containerendpoint?: string;
  contributorsecuritygroupid?: string;
  createdon?: string;
  datalakefolder_uniquename?: string;
  datalakefolderid?: string;
  deltaLakePath?: string;
  extendedproperties?: string;
  importsequencenumber?: number;
  iscompliancelake?: boolean;
  iscustomercapacity?: boolean;
  iscustomizable?: BooleanManagedProperty;
  isdeepcopyenabled?: boolean;
  isexternallake?: boolean;
  isexternallakereadonly?: boolean;
  ismanaged?: boolean;
  isprivate?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  owningappid?: string;
  path?: string;
  readersecuritygroupid?: string;
  resourcegroup?: string;
  sharedforreadaccess?: boolean;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  subscription?: string;
  synchronizeschematodataverse?: boolean;
  synchronizeschematosynapsedb?: boolean;
  tenant?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
