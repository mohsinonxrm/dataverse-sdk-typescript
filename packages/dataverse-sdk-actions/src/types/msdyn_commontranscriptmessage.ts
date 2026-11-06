/**
 * msdyn_commontranscriptmessage entity type
 */
export interface msdyn_commontranscriptmessage {
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
  msdyn_commontranscriptmessageid?: string;
  msdyn_content?: string;
  msdyn_conversationid?: string;
  msdyn_messagetimestamp?: string;
  msdyn_messagetype?: string;
  msdyn_participantid?: string;
  msdyn_productsku?: string;
  msdyn_role?: string;
  msdyn_sender?: string;
  msdyn_sequence?: number;
  msdyn_sourcemessageid?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
