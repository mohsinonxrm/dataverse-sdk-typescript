/**
 * msdyn_aievent entity type
 */
export interface msdyn_aievent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_aiconfigurationid_value?: string;
  _msdyn_aimodelid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_aieventid?: string;
  msdyn_approvalid?: string;
  msdyn_automationlink?: string;
  msdyn_automationname?: string;
  msdyn_consumptionsource?: number;
  msdyn_creditconsumed?: number;
  msdyn_datainfo?: string;
  msdyn_datainfofile?: string;
  msdyn_datainfofile_name?: string;
  msdyn_datatype?: string;
  msdyn_eventdata?: string;
  msdyn_name?: string;
  msdyn_output?: string;
  msdyn_outputfile?: string;
  msdyn_outputfile_name?: string;
  msdyn_partnersource?: string;
  msdyn_processingdate?: string;
  msdyn_processingstatus?: number;
  msdyn_quicktest?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
