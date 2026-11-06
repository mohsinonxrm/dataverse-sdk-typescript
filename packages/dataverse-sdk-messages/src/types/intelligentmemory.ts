/**
 * intelligentmemory entity type
 */
export interface intelligentmemory {
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
  intelligentmemoryid?: string;
  intelligentmemoryname?: string;
  memorykind?: string;
  memorysource?: string;
  memorytype?: string;
  modifiedon?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  predicate?: string;
  privacylevel?: string;
  recordversion?: string;
  sourceid?: string;
  subject?: string;
  targetobject?: string;
  ttlinseconds?: number;
  versionnumber?: number;
}
