/**
 * msdyn_contactcentergeneratedrule entity type
 */
export interface msdyn_contactcentergeneratedrule {
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
  msdyn_contactcentergeneratedruleid?: string;
  msdyn_failurereason?: string;
  msdyn_generatedrule?: string;
  msdyn_inputcontract?: string;
  msdyn_name?: string;
  msdyn_outputcontract?: string;
  msdyn_prompt?: string;
  msdyn_publishstatus?: number;
  msdyn_queueids?: string;
  msdyn_status?: number;
  msdyn_triggertype?: number;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
