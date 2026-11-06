/**
 * msdyn_segmentattribute entity type
 */
export interface msdyn_segmentattribute {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_aggregatedprimaryentityattributelist?: string;
  msdyn_aggregatedrelatedentityattributelist?: string;
  msdyn_attributemapping?: string;
  msdyn_name?: string;
  msdyn_objecttype?: string;
  msdyn_segmentattributeid?: string;
  msdyn_segmentpriorityorder?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
