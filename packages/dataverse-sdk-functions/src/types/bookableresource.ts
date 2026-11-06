/**
 * bookableresource entity type
 */
export interface bookableresource {
  _accountid_value?: string;
  _calendarid_value?: string;
  _contactid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_facilityequipmentid_value?: string;
  _msdyn_organizationalunit_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _transactioncurrencyid_value?: string;
  _userid_value?: string;
  bookableresourceid?: string;
  createdon?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_derivecapacity?: boolean;
  msdyn_displayonscheduleassistant?: boolean;
  msdyn_displayonscheduleboard?: boolean;
  msdyn_enableappointments?: number;
  msdyn_enableoutlookschedules?: number;
  msdyn_endlocation?: number;
  msdyn_generictype?: number;
  msdyn_optimalcrewsize?: number;
  msdyn_pooltype?: string;
  msdyn_primaryemail?: string;
  msdyn_startlocation?: number;
  msdyn_targetutilization?: number;
  msdyn_travelafterworkinghoursminutes?: number;
  msdyn_travelbeforeworkinghoursminutes?: number;
  name?: string;
  overriddencreatedon?: string;
  processid?: string;
  resourcetype?: number;
  stageid?: string;
  statecode?: number;
  statuscode?: number;
  timezone?: number;
  timezoneruleversionnumber?: number;
  traversedpath?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
