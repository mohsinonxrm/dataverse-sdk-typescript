/**
 * msdyn_optimizeschedulestate entity type
 */
export interface msdyn_optimizeschedulestate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_activatedby_value?: string;
  _msdyn_lastrun_value?: string;
  _msdyn_optimizesegment_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_activationtime?: string;
  msdyn_autodisablereason?: string;
  msdyn_consecutivefailurecount?: number;
  msdyn_enabled?: boolean;
  msdyn_environmentstamp?: string;
  msdyn_lastfiredslot?: string;
  msdyn_lastrunid?: string;
  msdyn_name?: string;
  msdyn_nextrunutc?: string;
  msdyn_occurrencecount?: number;
  msdyn_optimizeschedulestateid?: string;
  msdyn_schedulestatus?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
