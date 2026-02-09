/**
 * plannersyncaction entity type
 */
export interface plannersyncaction {
  lastattemptedon: string;
  startdatetime: string;
  overriddencreatedon: string;
  importsequencenumber: number;
  plannersyncactionid: string;
  groupid: string;
  lastsyncerror: string;
  queuedon: string;
  title: string;
  _ownerid_value: string;
  timezoneruleversionnumber: number;
  _owningbusinessunit_value: string;
  sourcerecordentitylogicalname: string;
  notes: string;
  percentcomplete: number;
  _owningteam_value: string;
  pendingattempts: number;
  duedatetime: string;
  sourcerecordid: string;
  versionnumber: number;
  externalreferences: string;
  _owninguser_value: string;
  _plannerbusinessscenarioid_value: string;
  externalbucketid: string;
  statuscode: number;
  priority: number;
  assignments: string;
  statecode: number;
  utcconversiontimezonecode: number;
}
