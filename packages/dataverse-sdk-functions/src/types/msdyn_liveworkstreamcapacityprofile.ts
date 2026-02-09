import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_liveworkstreamcapacityprofile entity type
 */
export interface msdyn_liveworkstreamcapacityprofile {
  overriddencreatedon: string;
  _owninguser_value: string;
  solutionid: string;
  _createdonbehalfby_value: string;
  msdyn_liveworkstreamcapacityprofileid: string;
  _owningbusinessunit_value: string;
  versionnumber: number;
  statuscode: number;
  createdon: string;
  modifiedon: string;
  _owningteam_value: string;
  _ownerid_value: string;
  _modifiedby_value: string;
  iscustomizable: BooleanManagedProperty;
  _modifiedonbehalfby_value: string;
  statecode: number;
  msdyn_name: string;
  _msdyn_capacityprofile_id_value: string;
  componentidunique: string;
  ismanaged: boolean;
  _msdyn_workstream_id_value: string;
  importsequencenumber: number;
  _createdby_value: string;
  timezoneruleversionnumber: number;
  overwritetime: string;
  utcconversiontimezonecode: number;
  componentstate: number;
}
