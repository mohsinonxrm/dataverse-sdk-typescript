/**
 * msdyn_aidataprocessingevent entity type
 */
export interface msdyn_aidataprocessingevent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_aidataprocessingeventid?: string;
  msdyn_customdata?: string;
  msdyn_inputdata?: string;
  msdyn_inputdata_name?: string;
  msdyn_inputdataformat?: string;
  msdyn_name?: string;
  msdyn_processeddata?: string;
  msdyn_processingstatus?: number;
  msdyn_processorname?: string;
  msdyn_processortype?: string;
  msdyn_receiveddate?: string;
  msdyn_updateddate?: string;
  msdyn_validationresult?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
