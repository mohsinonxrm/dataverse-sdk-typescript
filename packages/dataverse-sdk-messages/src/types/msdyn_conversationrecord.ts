/**
 * msdyn_conversationrecord entity type
 */
export interface msdyn_conversationrecord {
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
  msdyn_channelinstanceid?: string;
  msdyn_channeltype?: string;
  msdyn_conversationclosedon?: string;
  msdyn_conversationcreatedon?: string;
  msdyn_conversationid?: string;
  msdyn_conversationrecordid?: string;
  msdyn_conversationstate?: string;
  msdyn_conversationtitle?: string;
  msdyn_conversationtranscript?: string;
  msdyn_customerfirstwaittime?: number;
  msdyn_customerid?: string;
  msdyn_customerlocale?: string;
  msdyn_customersentiment?: string;
  msdyn_isescalatedtocustomerservicerepresentative?: boolean;
  msdyn_workstream?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
