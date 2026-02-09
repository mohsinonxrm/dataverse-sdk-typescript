import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocpaymentprofile entity type
 */
export interface msdyn_ocpaymentprofile {
  utcconversiontimezonecode: number;
  _owningteam_value: string;
  msdyn_name: string;
  statuscode: number;
  componentstate: number;
  iscustomizable: BooleanManagedProperty;
  importsequencenumber: number;
  msdyn_ocpaymentprofileid: string;
  createdon: string;
  overwritetime: string;
  _owningbusinessunit_value: string;
  overriddencreatedon: string;
  _createdby_value: string;
  ismanaged: boolean;
  _createdonbehalfby_value: string;
  _modifiedonbehalfby_value: string;
  statecode: number;
  componentidunique: string;
  _owninguser_value: string;
  _msdyn_ocapplepayid_value: string;
  _ownerid_value: string;
  modifiedon: string;
  msdyn_ocpaymentprofilename: string;
  timezoneruleversionnumber: number;
  versionnumber: number;
  solutionid: string;
  _modifiedby_value: string;
  msdyn_occhanneltype: number;
}
