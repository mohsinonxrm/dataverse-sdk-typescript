import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * flowmachineimageversion entity type
 */
export interface flowmachineimageversion {
  createdon: string;
  _owningteam_value: string;
  _ownerid_value: string;
  componentidunique: string;
  componentstate: number;
  flowmachineimageversionid: string;
  generalizationlogs: string;
  _owningbusinessunit_value: string;
  _modifiedby_value: string;
  reference: string;
  version: string;
  ismanaged: boolean;
  _createdonbehalfby_value: string;
  timezoneruleversionnumber: number;
  generalizationlogs_name: string;
  _flowmachineimage_value: string;
  _owninguser_value: string;
  importsequencenumber: number;
  supportedscenario: number;
  _modifiedonbehalfby_value: string;
  utcconversiontimezonecode: number;
  statuscode: number;
  name: string;
  modifiedon: string;
  statecode: number;
  iscustomizable: BooleanManagedProperty;
  _sourcemachineid_value: string;
  provisioningerror: string;
  statuserrormessage: string;
  overwritetime: string;
  overriddencreatedon: string;
  versionnumber: number;
  solutionid: string;
  _createdby_value: string;
}
