/**
 * msdyn_migrationtracker entity type
 */
export interface msdyn_migrationtracker {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_legacyconvertruleid_value?: string;
  _msdyn_legacyconvertruleitemid_value?: string;
  _msdyn_legacyslaid_value?: string;
  _msdyn_legacyslaitemid_value?: string;
  _msdyn_modernconvertruleid_value?: string;
  _msdyn_modernconvertruleitemid_value?: string;
  _msdyn_modernslaid_value?: string;
  _msdyn_modernslaitemid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  correlationid?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_IsMigrationComplete?: boolean;
  msdyn_correlationid?: string;
  msdyn_legacyruleidname?: string;
  msdyn_legacyruleidtype?: string;
  msdyn_legacyruleitemidname?: string;
  msdyn_legacyruleitemidtype?: string;
  msdyn_migrationstatus?: number;
  msdyn_migrationstatusexception?: string;
  msdyn_migrationstatusreason?: string;
  msdyn_migrationtrackerid?: string;
  msdyn_migrationtype?: number;
  msdyn_modernruleidname?: string;
  msdyn_modernruleidtype?: string;
  msdyn_modernruleitemidname?: string;
  msdyn_modernruleitemidtype?: string;
  msdyn_name?: string;
  msdyn_objecttypecode?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
