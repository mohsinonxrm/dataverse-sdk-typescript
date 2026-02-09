import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * datalakefolder entity type
 */
export interface datalakefolder {
  iscompliancelake: boolean;
  utcconversiontimezonecode: number;
  _owningteam_value: string;
  overwritetime: string;
  _modifiedonbehalfby_value: string;
  tenant: string;
  componentstate: number;
  iscustomizable: BooleanManagedProperty;
  timezoneruleversionnumber: number;
  name: string;
  importsequencenumber: number;
  statuscode: number;
  _createdonbehalfby_value: string;
  isdeepcopyenabled: boolean;
  _createdby_value: string;
  sharedforreadaccess: boolean;
  containerendpoint: string;
  componentidunique: string;
  _owninguser_value: string;
  isprivate: boolean;
  isexternallakereadonly: boolean;
  readersecuritygroupid: string;
  _modifiedby_value: string;
  synchronizeschematodataverse: boolean;
  deltaLakePath: string;
  modifiedon: string;
  extendedproperties: string;
  compliancelakelocation: string;
  versionnumber: number;
  cdmpath: string;
  isexternallake: boolean;
  resourcegroup: string;
  synchronizeschematosynapsedb: boolean;
  iscustomercapacity: boolean;
  createdon: string;
  subscription: string;
  solutionid: string;
  _parentfolderid_value: string;
  overriddencreatedon: string;
  contributorsecuritygroupid: string;
  statecode: number;
  ismanaged: boolean;
  _ownerid_value: string;
  owningappid: string;
  path: string;
  datalakefolderid: string;
  accesstype: string;
  datalakefolder_uniquename: string;
  _owningbusinessunit_value: string;
}
