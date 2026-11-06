/**
 * timezonedefinition entity type
 */
export interface timezonedefinition {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  bias?: number;
  createdon?: string;
  daylightname?: string;
  modifiedon?: string;
  retiredorder?: number;
  standardname?: string;
  timezonecode?: number;
  timezonedefinitionid?: string;
  userinterfacename?: string;
  versionnumber?: number;
}
