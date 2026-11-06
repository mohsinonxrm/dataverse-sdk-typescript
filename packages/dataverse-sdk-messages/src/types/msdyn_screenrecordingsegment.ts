/**
 * msdyn_screenrecordingsegment entity type
 */
export interface msdyn_screenrecordingsegment {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_parentrecordingid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_islastsegment?: boolean;
  msdyn_name?: string;
  msdyn_rawsegment?: string;
  msdyn_rawsegment_name?: string;
  msdyn_redactedsegment?: string;
  msdyn_redactedsegment_name?: string;
  msdyn_redactedsegmentcompletiontime?: string;
  msdyn_redactionstatus?: number;
  msdyn_screenrecordingsegmentid?: string;
  msdyn_segmentnumber?: number;
  overriddencreatedon?: string;
  partitionid?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
