/**
 * tracelog entity type
 */
export interface tracelog {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _parenttracelogid_value?: string;
  _regardingobjectid_value?: string;
  _regardingobjectownerid_value?: string;
  _regardingobjectowningbusinessunit_value?: string;
  canbedeleted?: boolean;
  collationlevel?: number;
  createdon?: string;
  errordetails?: string;
  errortypedisplay?: string;
  isunique?: boolean;
  level?: number;
  machinename?: string;
  modifiedon?: string;
  text?: string;
  timezoneruleversionnumber?: number;
  traceactionxml?: string;
  tracecode?: number;
  tracedetailxml?: string;
  tracelogid?: string;
  traceparameterhash?: number;
  traceparameterxml?: string;
  tracestatus?: boolean;
  utcconversiontimezonecode?: number;
}
