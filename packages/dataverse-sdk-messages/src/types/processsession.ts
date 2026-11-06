/**
 * processsession entity type
 */
export interface processsession {
  _canceledby_value?: string;
  _completedby_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _executedby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _nextlinkedsessionid_value?: string;
  _originatingsessionid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _previouslinkedsessionid_value?: string;
  _processid_value?: string;
  _regardingobjectid_value?: string;
  _startedby_value?: string;
  activityname?: string;
  canceledon?: string;
  comments?: string;
  completedon?: string;
  createdon?: string;
  errorcode?: number;
  executedon?: string;
  inputarguments?: string;
  modifiedon?: string;
  name?: string;
  processsessionid?: string;
  processstagename?: string;
  processstate?: string;
  processstate_binary?: string;
  startedon?: string;
  statecode?: number;
  statuscode?: number;
  stepname?: string;
}
