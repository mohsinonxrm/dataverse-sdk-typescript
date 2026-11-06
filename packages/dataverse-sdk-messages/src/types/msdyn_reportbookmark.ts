/**
 * msdyn_reportbookmark entity type
 */
export interface msdyn_reportbookmark {
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
  msdyn_isdefault?: boolean;
  msdyn_name?: string;
  msdyn_relatedfeatureid?: string;
  msdyn_relatedreportid?: string;
  msdyn_reportbookmarkid?: string;
  msdyn_state?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
