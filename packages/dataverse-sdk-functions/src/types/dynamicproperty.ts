/**
 * dynamicproperty entity type
 */
export interface dynamicproperty {
  _basedynamicpropertyid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _defaultvalueoptionset_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _regardingobjectid_value?: string;
  createdon?: string;
  datatype?: number;
  defaultattributevalue?: string;
  defaultvaluedecimal?: number;
  defaultvaluedouble?: number;
  defaultvalueinteger?: number;
  defaultvaluestring?: string;
  description?: string;
  dmtimportstate?: number;
  dynamicpropertyid?: string;
  importsequencenumber?: number;
  ishidden?: boolean;
  isreadonly?: boolean;
  isrequired?: boolean;
  maxlengthstring?: number;
  maxvaluedecimal?: number;
  maxvaluedouble?: number;
  maxvalueinteger?: number;
  minvaluedecimal?: number;
  minvaluedouble?: number;
  minvalueinteger?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwrittendynamicpropertyid?: string;
  precision?: number;
  rootdynamicpropertyid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
