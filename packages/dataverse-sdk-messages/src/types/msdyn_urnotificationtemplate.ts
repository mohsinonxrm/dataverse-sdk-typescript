import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_urnotificationtemplate entity type
 */
export interface msdyn_urnotificationtemplate {
  createdon: string;
  msdyn_channeltype: number;
  _modifiedonbehalfby_value: string;
  versionnumber: number;
  _modifiedby_value: string;
  _createdonbehalfby_value: string;
  timezoneruleversionnumber: number;
  msdyn_urnotificationtemplateid: string;
  solutionid: string;
  overriddencreatedon: string;
  statuscode: number;
  msdyn_entitytitlemapping: string;
  ismanaged: boolean;
  overwritetime: string;
  msdyn_entitylogicalname: string;
  componentstate: number;
  _ownerid_value: string;
  componentidunique: string;
  _owningbusinessunit_value: string;
  utcconversiontimezonecode: number;
  iscustomizable: BooleanManagedProperty;
  _createdby_value: string;
  _owninguser_value: string;
  _owningteam_value: string;
  msdyn_name: string;
  modifiedon: string;
  importsequencenumber: number;
  statecode: number;
}
