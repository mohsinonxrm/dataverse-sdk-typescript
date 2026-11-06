/**
 * msdyn_timegroup entity type
 */
export interface msdyn_timegroup {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _stageid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_displaytopxresultsinsatimegroup?: number;
  msdyn_hidebookingtimeonsa?: boolean;
  msdyn_interval?: number;
  msdyn_intervalsbegin?: string;
  msdyn_name?: string;
  msdyn_resetpertimegroupdetail?: boolean;
  msdyn_resultsperinterval?: number;
  msdyn_timegroupid?: string;
  overriddencreatedon?: string;
  processid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  traversedpath?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
