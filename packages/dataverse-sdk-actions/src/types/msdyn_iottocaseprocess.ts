/**
 * msdyn_iottocaseprocess entity type
 */
export interface msdyn_iottocaseprocess {
  _activestageid_value?: string;
  _bpf_incidentid_value?: string;
  _bpf_msdyn_iotalertid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _processid_value?: string;
  activestagestartedon?: string;
  bpf_duration?: number;
  bpf_name?: string;
  businessprocessflowinstanceid?: string;
  completedon?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  traversedpath?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
