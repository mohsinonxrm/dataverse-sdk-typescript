/**
 * msdyn_agentnudge entity type
 */
export interface msdyn_agentnudge {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_action_value?: string;
  _msdyn_nudgetemplateid_value?: string;
  _msdyn_ocliveworkitem_value?: string;
  _msdyn_systemuser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_agentnudgeid?: string;
  msdyn_escalated?: boolean;
  msdyn_explanation?: string;
  msdyn_feedback?: number;
  msdyn_frequency?: number;
  msdyn_name?: string;
  msdyn_nudgetext?: string;
  msdyn_priority?: number;
  msdyn_shownudge?: boolean;
  msdyn_status?: number;
  msdyn_suggestedresponse?: string;
  msdyn_timestamp?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
