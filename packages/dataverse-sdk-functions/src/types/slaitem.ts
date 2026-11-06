/**
 * slaitem entity type
 */
export interface slaitem {
  _businesshoursid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_customtimecalculationworkflowid_value?: string;
  _msdyn_slakpiid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owninguser_value?: string;
  _slaid_value?: string;
  _transactioncurrencyid_value?: string;
  _workflowid_value?: string;
  actionflowuniquename?: string;
  actionurl?: string;
  allowpauseresume?: boolean;
  applicableentity?: string;
  applicablewhenxml?: string;
  changedattributelist?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  exchangerate?: number;
  failureafter?: number;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_advancedpauseconfiguration?: boolean;
  msdyn_customtimecalculation?: boolean;
  msdyn_pauseconfigurationxml?: string;
  name?: string;
  overwritetime?: string;
  relatedfield?: string;
  sequencenumber?: number;
  slaitemid?: string;
  slaitemidunique?: string;
  solutionid?: string;
  successconditionsxml?: string;
  versionnumber?: number;
  warnafter?: number;
}
