/**
 * msdyn_salesroutingrun entity type
 */
export interface msdyn_salesroutingrun {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_assignmentruleid_value?: string;
  _msdyn_ownerassigned_value?: string;
  _msdyn_previousowner_value?: string;
  _msdyn_previoussegmentid_value?: string;
  _msdyn_saruninstanceid_value?: string;
  _msdyn_segmentid_value?: string;
  _msdyn_targetobject_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_connectedsequenceids?: string;
  msdyn_connectsequencestatus?: number;
  msdyn_errormessage?: string;
  msdyn_isrecordassigned?: boolean;
  msdyn_name?: string;
  msdyn_routingrequestsource?: number;
  msdyn_routingstatus?: number;
  msdyn_salesroutingrunid?: string;
  msdyn_segmentationstatus?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
