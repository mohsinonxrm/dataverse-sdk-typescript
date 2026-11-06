/**
 * msdyn_tracewatermark entity type
 */
export interface msdyn_tracewatermark {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_lastmineat?: string;
  msdyn_lastwatermark?: string;
  msdyn_subscriptionid?: string;
  msdyn_tracewatermarkid?: string;
  msdyn_tracewatermarkname?: string;
  msdyn_workspaceid?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
