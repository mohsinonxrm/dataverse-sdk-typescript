/**
 * slakpiinstance entity type
 */
export interface slakpiinstance {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_slaitemid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _regarding_value?: string;
  _transactioncurrencyid_value?: string;
  applicablefromvalue?: string;
  computedfailuretime?: string;
  computedwarningtime?: string;
  createdon?: string;
  description?: string;
  elapsedtime?: number;
  exchangerate?: number;
  failuretime?: string;
  lastresumetime?: string;
  modifiedon?: string;
  msdyn_actionexecutionstatus?: number;
  msdyn_activeduration?: number;
  msdyn_calendarid?: string;
  msdyn_prevslakpiinstanceid?: string;
  name?: string;
  pausedon?: string;
  regardingentityid?: string;
  slakpiinstanceid?: string;
  status?: number;
  succeededon?: string;
  successcheckedat?: string;
  terminalstatereached?: boolean;
  terminalstatetime?: string;
  versionnumber?: number;
  warningtime?: string;
  warningtimereached?: number;
}
