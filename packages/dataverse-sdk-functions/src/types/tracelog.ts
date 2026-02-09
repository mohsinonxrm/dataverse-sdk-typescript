/**
 * tracelog entity type
 */
export interface tracelog {
  collationlevel: number;
  traceparameterxml: string;
  level: number;
  canbedeleted: boolean;
  traceparameterhash: number;
  createdon: string;
  text: string;
  tracelogid: string;
  _regardingobjectowningbusinessunit_value: string;
  timezoneruleversionnumber: number;
  tracedetailxml: string;
  utcconversiontimezonecode: number;
  machinename: string;
  _createdonbehalfby_value: string;
  _organizationid_value: string;
  tracecode: number;
  _createdby_value: string;
  modifiedon: string;
  errortypedisplay: string;
  _modifiedby_value: string;
  traceactionxml: string;
  isunique: boolean;
  _modifiedonbehalfby_value: string;
  tracestatus: boolean;
  _regardingobjectid_value: string;
  _regardingobjectownerid_value: string;
  errordetails: string;
  _parenttracelogid_value: string;
}
