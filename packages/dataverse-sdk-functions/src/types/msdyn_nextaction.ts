/**
 * msdyn_nextaction entity type
 */
export interface msdyn_nextaction {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_regarding_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_actiondata?: string;
  msdyn_actiontype?: number;
  msdyn_isfullautonomous?: boolean;
  msdyn_name?: string;
  msdyn_nextactionid?: string;
  msdyn_validfrom?: string;
  msdyn_validto?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
