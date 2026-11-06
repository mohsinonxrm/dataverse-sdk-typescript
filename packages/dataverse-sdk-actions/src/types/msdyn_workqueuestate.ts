/**
 * msdyn_workqueuestate entity type
 */
export interface msdyn_workqueuestate {
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
  msdyn_isread?: boolean;
  msdyn_nextactionid?: string;
  msdyn_nextactionsource?: string;
  msdyn_primaryname?: string;
  msdyn_workqueuestateid?: string;
  msdyn_wqstateuniquekey?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
