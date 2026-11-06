/**
 * ownermapping entity type
 */
export interface ownermapping {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _importmapid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _targetsystemuserid_value?: string;
  componentstate?: number;
  createdon?: string;
  introducedversion?: string;
  ismanaged?: boolean;
  modifiedon?: string;
  overwritetime?: string;
  ownermappingid?: string;
  ownermappingidunique?: string;
  processcode?: number;
  solutionid?: string;
  sourcesystemusername?: string;
  sourceuservalueforsourcecrmuserlink?: string;
  statecode?: number;
  statuscode?: number;
  targetsystemuserdomainname?: string;
  targetuservalueforsourcecrmuserlink?: string;
}
