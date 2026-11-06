/**
 * processorregistration entity type
 */
export interface processorregistration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _signalname_value?: string;
  _traitname_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  processordefinition?: string;
  processorregistrationid?: string;
  processortype?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  traitcomponentkey?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
