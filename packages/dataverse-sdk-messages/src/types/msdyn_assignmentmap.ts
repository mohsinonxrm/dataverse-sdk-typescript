/**
 * msdyn_assignmentmap entity type
 */
export interface msdyn_assignmentmap {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_systemuserid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_applicableforrouting?: boolean;
  msdyn_assignedticks?: string;
  msdyn_assignmentmapid?: string;
  msdyn_availablecapacity?: number;
  msdyn_isreconcilerequired?: boolean;
  msdyn_lastreconciledtime?: string;
  msdyn_maxcapacity?: number;
  msdyn_name?: string;
  msdyn_reconciletaskconsumedcapacity?: number;
  msdyn_rulelevelassignedticksjson?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
