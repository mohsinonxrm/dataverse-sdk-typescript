import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pminferredtask entity type
 */
export interface msdyn_pminferredtask {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_businessprocessid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_analysisschedule?: string;
  msdyn_automationdata?: string;
  msdyn_automationstatus?: number;
  msdyn_datavalidation?: string;
  msdyn_description?: string;
  msdyn_inputdatabinding?: string;
  msdyn_isreportavailable?: boolean;
  msdyn_iterationid?: string;
  msdyn_lasterrors?: string;
  msdyn_lasterrorsreport?: string;
  msdyn_lasterrorsreport_name?: string;
  msdyn_lastreportrefreshdate?: string;
  msdyn_name?: string;
  msdyn_outputdata?: string;
  msdyn_pminferredtaskid?: string;
  msdyn_reportdata?: string;
  msdyn_reportprovisioningstatus?: number;
  msdyn_sharedrecordingmetadata?: string;
  msdyn_source?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
