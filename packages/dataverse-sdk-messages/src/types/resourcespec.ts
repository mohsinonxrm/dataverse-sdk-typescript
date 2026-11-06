/**
 * resourcespec entity type
 */
export interface resourcespec {
  _businessunitid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  constraints?: string;
  createdon?: string;
  description?: string;
  effortrequired?: number;
  groupobjectid?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  objectiveexpression?: string;
  objecttypecode?: string;
  overriddencreatedon?: string;
  requiredcount?: number;
  resourcespecid?: string;
  samesite?: boolean;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
