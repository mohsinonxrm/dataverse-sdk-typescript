/**
 * athenaltrmigrationstate entity type
 */
export interface athenaltrmigrationstate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  athenaltrmigrationstateid?: string;
  attachmentblobscopied?: number;
  attachmentblobsmissing?: number;
  attachmentcopydeferred?: number;
  createdon?: string;
  endtimeutc?: string;
  entityname?: string;
  failurecode?: string;
  floorversionused?: string;
  gaprecordsmigrated?: string;
  importsequencenumber?: number;
  lastexecutionid?: string;
  lastreconciledutc?: string;
  message?: string;
  migrationoutcome?: number;
  migrationsuccessful?: number;
  migrationtimems?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  profileid?: string;
  reconciliationcomplete?: number;
  reconciliationran?: number;
  retrycount?: number;
  rowsmigrated?: string;
  starttimeutc?: string;
  statecode?: number;
  statuscode?: number;
  stoppedonbudget?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  windowsprocessed?: number;
}
