/**
 * flowcapacityassignment entity type
 */
export interface flowcapacityassignment {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _regarding_value?: string;
  allocationorigin?: number;
  allowautoallocation?: boolean;
  capacityoverage?: number;
  capacitysource?: number;
  capacitytype?: number;
  count?: number;
  createdon?: string;
  flowcapacityassignmentid?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
