/**
 * policycriterion entity type
 */
export interface policycriterion {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  criteriadisplaytext?: string;
  criterion?: string;
  criterionid?: string;
  entityid?: string;
  importsequencenumber?: number;
  isenabled?: boolean;
  issystemgenerated?: boolean;
  modifiedon?: string;
  name?: string;
  orderedquerysetxml?: string;
  overriddencreatedon?: string;
  policycriterionid?: string;
  priority?: number;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  uniquename?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
