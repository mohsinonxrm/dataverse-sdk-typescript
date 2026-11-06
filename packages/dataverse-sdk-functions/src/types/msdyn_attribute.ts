/**
 * msdyn_attribute entity type
 */
export interface msdyn_attribute {
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
  msdyn_attributeid?: string;
  msdyn_autogenerateattributevalues?: boolean;
  msdyn_linkedattributename?: string;
  msdyn_linkedobjecttypecode?: number;
  msdyn_name?: string;
  msdyn_reviewstatus?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
