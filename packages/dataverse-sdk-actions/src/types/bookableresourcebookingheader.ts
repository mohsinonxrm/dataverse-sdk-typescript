/**
 * bookableresourcebookingheader entity type
 */
export interface bookableresourcebookingheader {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_bookableresourceid_value?: string;
  _msdyn_bookingstatusid_value?: string;
  _msdyn_resourcerequirement_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _transactioncurrencyid_value?: string;
  bookableresourcebookingheaderid?: string;
  createdon?: string;
  duration?: number;
  endtime?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_bookingtype?: number;
  msdyn_tzaendtime?: string;
  msdyn_tzastarttime?: string;
  name?: string;
  overriddencreatedon?: string;
  processid?: string;
  stageid?: string;
  starttime?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  traversedpath?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
