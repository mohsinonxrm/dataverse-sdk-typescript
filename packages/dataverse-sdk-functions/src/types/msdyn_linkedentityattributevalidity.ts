/**
 * msdyn_linkedentityattributevalidity entity type
 */
export interface msdyn_linkedentityattributevalidity {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_linkeditemlookup_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_attributename?: string;
  msdyn_attributetype?: number;
  msdyn_datahash?: string;
  msdyn_datavalidity?: number;
  msdyn_errorcode?: number;
  msdyn_linkedentityattributevalidityid?: string;
  msdyn_validationresponse?: string;
  msdyn_validationstatus?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
