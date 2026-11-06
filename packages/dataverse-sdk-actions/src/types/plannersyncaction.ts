/**
 * plannersyncaction entity type
 */
export interface plannersyncaction {
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _plannerbusinessscenarioid_value?: string;
  assignments?: string;
  duedatetime?: string;
  externalbucketid?: string;
  externalreferences?: string;
  groupid?: string;
  importsequencenumber?: number;
  lastattemptedon?: string;
  lastsyncerror?: string;
  notes?: string;
  overriddencreatedon?: string;
  pendingattempts?: number;
  percentcomplete?: number;
  plannersyncactionid?: string;
  priority?: number;
  queuedon?: string;
  sourcerecordentitylogicalname?: string;
  sourcerecordid?: string;
  startdatetime?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  title?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
