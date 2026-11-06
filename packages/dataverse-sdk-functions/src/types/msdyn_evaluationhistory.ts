/**
 * msdyn_evaluationhistory entity type
 */
export interface msdyn_evaluationhistory {
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
  msdyn_evaluationhistoryid?: string;
  msdyn_evaluationscore?: number;
  msdyn_frequency?: number;
  msdyn_lastevaluatedmessagetime?: string;
  msdyn_messageid?: string;
  msdyn_name?: string;
  msdyn_ocliveworkitemid?: string;
  msdyn_responsejson?: string;
  msdyn_targetfeature?: number;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
