/**
 * flowmachine entity type
 */
export interface flowmachine {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _flowmachinegroupid_value?: string;
  _flowmachineimageversionid_value?: string;
  _flowmachinenetworkid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  agentversion?: string;
  connectivityconfiguration?: string;
  createdon?: string;
  description?: string;
  flowmachineid?: string;
  hostedmachineerror?: string;
  hostedmachinestate?: number;
  hostingtype?: number;
  importsequencenumber?: number;
  keydeliverystatus?: number;
  keyreceiveddate?: string;
  lastheartbeatdate?: string;
  lastknownpictureinpicturesupport?: number;
  machinemetadata?: string;
  modifiedon?: string;
  name?: string;
  overcapacitysince?: string;
  overriddencreatedon?: string;
  sessioncapacity?: number;
  snapshotstartedat?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
