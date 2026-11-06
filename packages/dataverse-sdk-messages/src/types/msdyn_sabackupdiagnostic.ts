/**
 * msdyn_sabackupdiagnostic entity type
 */
export interface msdyn_sabackupdiagnostic {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_target_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_changedata?: string;
  msdyn_diagnostictype?: number;
  msdyn_name?: string;
  msdyn_sabackupdiagnosticid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
