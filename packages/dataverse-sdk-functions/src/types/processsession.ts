/**
 * processsession entity type
 */
export interface processsession {
  completedon?: string;
  _executedby_value?: string;
  _completedby_value?: string;
  executedon?: string;
  _modifiedby_value?: string;
  _nextlinkedsessionid_value?: string;
  name?: string;
  modifiedon?: string;
  _regardingobjectid_value?: string;
  _originatingsessionid_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owninguser_value?: string;
  _previouslinkedsessionid_value?: string;
  _owningteam_value?: string;
  processstate?: string;
  processstate_binary?: string;
  _canceledby_value?: string;
  comments?: string;
  _createdby_value?: string;
  canceledon?: string;
  activityname?: string;
  _createdonbehalfby_value?: string;
  processstagename?: string;
  createdon?: string;
  processsessionid?: string;
  errorcode?: number;
  _owningbusinessunit_value?: string;
  _processid_value?: string;
  statuscode?: number;
  _startedby_value?: string;
  stepname?: string;
  inputarguments?: string;
  startedon?: string;
  statecode?: number;
}
