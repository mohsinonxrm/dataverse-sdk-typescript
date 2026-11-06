/**
 * msdyn_unifiedroutingdiagnostic entity type
 */
export interface msdyn_unifiedroutingdiagnostic {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_decisionrulesetid_value?: string;
  _msdyn_ocliveworkitemid_value?: string;
  _msdyn_targetobject_value?: string;
  _msdyn_unifiedroutingrunid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_completedon?: string;
  msdyn_diagnosticdata?: string;
  msdyn_diagnosticdatatype?: number;
  msdyn_evaluation?: string;
  msdyn_inputdata?: string;
  msdyn_name?: string;
  msdyn_outputdata?: string;
  msdyn_ruletype?: number;
  msdyn_sequencenumber?: number;
  msdyn_startedon?: string;
  msdyn_unifiedroutingdiagnosticid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
