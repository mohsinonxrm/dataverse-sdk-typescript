import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evalresult entity type
 */
export interface msdyn_evalresult {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_evalrunlookupid_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_agentresponse?: string;
  msdyn_assertiontextsnapshot?: string;
  msdyn_callerid?: string;
  msdyn_datasetid?: string;
  msdyn_diagnosticinfo?: string;
  msdyn_evalassertionid?: string;
  msdyn_evalid?: string;
  msdyn_evalpromptid?: string;
  msdyn_evalresultid?: string;
  msdyn_evalrunid?: string;
  msdyn_evalscore?: number;
  msdyn_layertype?: number;
  msdyn_prompttextsnapshot?: string;
  msdyn_status?: number;
  msdyn_toolcalllist?: string;
  msdyn_totaltoolcalls?: number;
  msdyn_traceid?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
