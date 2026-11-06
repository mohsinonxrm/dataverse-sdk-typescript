/**
 * bookingstatus entity type
 */
export interface bookingstatus {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _transactioncurrencyid_value?: string;
  bookingstatusid?: string;
  createdon?: string;
  description?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_imageurl?: string;
  msdyn_optimizationmethod?: number;
  msdyn_serviceappointmentstatus?: number;
  msdyn_statuscolor?: string;
  name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  status?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
