/**
 * msdyn_dailycontactkpiitem entity type
 */
export interface msdyn_dailycontactkpiitem {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_entityid_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_computationaccuracy?: number;
  msdyn_contactid?: string;
  msdyn_dailycontactkpiitemid?: string;
  msdyn_date?: string;
  msdyn_emailsreceived?: number;
  msdyn_emailssent?: number;
  msdyn_liemailssent?: number;
  msdyn_meetingsreceived?: number;
  msdyn_meetingssent?: number;
  msdyn_name?: string;
  msdyn_phonecallsmade?: number;
  msdyn_phonecallsreceived?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
