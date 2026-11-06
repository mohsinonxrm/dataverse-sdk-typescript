/**
 * msdyn_optimizesegment entity type
 */
export interface msdyn_optimizesegment {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_optimizeentityconfig_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_anchorutc?: string;
  msdyn_cadence?: string;
  msdyn_coalescepolicy?: boolean;
  msdyn_definitionhash?: string;
  msdyn_definitionversion?: string;
  msdyn_endutc?: string;
  msdyn_fetchxml?: string;
  msdyn_maxoccurrences?: number;
  msdyn_mininterval?: number;
  msdyn_name?: string;
  msdyn_optimizesegmentid?: string;
  msdyn_patterntypes?: string;
  msdyn_schedulemode?: number;
  msdyn_timezone?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
