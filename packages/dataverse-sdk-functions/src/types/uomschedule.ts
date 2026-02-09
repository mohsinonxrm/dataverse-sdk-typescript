/**
 * uomschedule entity type
 */
export interface uomschedule {
  statecode: number;
  uomscheduleid: string;
  statuscode: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
  createdon: string;
  _createdonbehalfby_value: string;
  name: string;
  _createdby_value: string;
  importsequencenumber: number;
  _modifiedbyexternalparty_value: string;
  _modifiedonbehalfby_value: string;
  description: string;
  _modifiedby_value: string;
  baseuomname: string;
  modifiedon: string;
  overriddencreatedon: string;
  _organizationid_value: string;
  _createdbyexternalparty_value: string;
  timezoneruleversionnumber: number;
}
