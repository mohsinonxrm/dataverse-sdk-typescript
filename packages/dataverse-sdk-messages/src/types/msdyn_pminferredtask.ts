import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pminferredtask entity type
 */
export interface msdyn_pminferredtask {
  componentstate: number;
  _modifiedonbehalfby_value: string;
  timezoneruleversionnumber: number;
  _owninguser_value: string;
  _msdyn_businessprocessid_value: string;
  importsequencenumber: number;
  msdyn_lasterrorsreport: string;
  msdyn_description: string;
  msdyn_source: number;
  versionnumber: number;
  msdyn_pminferredtaskid: string;
  msdyn_isreportavailable: boolean;
  _owningbusinessunit_value: string;
  msdyn_reportdata: string;
  ismanaged: boolean;
  _owningteam_value: string;
  _createdonbehalfby_value: string;
  msdyn_name: string;
  createdon: string;
  msdyn_automationdata: string;
  statuscode: number;
  msdyn_lasterrors: string;
  solutionid: string;
  statecode: number;
  modifiedon: string;
  overriddencreatedon: string;
  msdyn_iterationid: string;
  msdyn_lasterrorsreport_name: string;
  _ownerid_value: string;
  overwritetime: string;
  _createdby_value: string;
  msdyn_analysisschedule: string;
  msdyn_sharedrecordingmetadata: string;
  _modifiedby_value: string;
  componentidunique: string;
  msdyn_inputdatabinding: string;
  msdyn_datavalidation: string;
  msdyn_automationstatus: number;
  utcconversiontimezonecode: number;
  iscustomizable: BooleanManagedProperty;
  msdyn_outputdata: string;
  msdyn_lastreportrefreshdate: string;
  msdyn_reportprovisioningstatus: number;
}
