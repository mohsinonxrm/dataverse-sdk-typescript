/**
 * post entity type
 */
export interface post {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _regardingobjectid_value?: string;
  _regardingobjectownerid_value?: string;
  _regardingobjectowningbusinessunit_value?: string;
  createdon?: string;
  largetext?: string;
  modifiedon?: string;
  postid?: string;
  source?: number;
  text?: string;
  timezoneruleversionnumber?: number;
  type?: number;
  utcconversiontimezonecode?: number;
}
