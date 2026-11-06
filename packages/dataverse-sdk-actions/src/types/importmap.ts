/**
 * importmap entity type
 */
export interface importmap {
  _owningbusinessunit_value?: string;
  source?: string;
  solutionid?: string;
  sourcetype?: number;
  entitiesperfile?: number;
  _ownerid_value?: string;
  isvalidforimport?: boolean;
  sourceuseridentifierforsourcecrmuserlink?: string;
  targetuseridentifierforsourcecrmuserlink?: string;
  sourceuseridentifierforsourcedatasourceuserlink?: string;
  importmapid?: string;
  iswizardcreated?: boolean;
  name?: string;
  targetentity?: number;
  importmapidunique?: string;
  _modifiedby_value?: string;
  _owningteam_value?: string;
  introducedversion?: string;
  _createdonbehalfby_value?: string;
  mapcustomizations?: string;
  description?: string;
  ismanaged?: boolean;
  statuscode?: number;
  overwritetime?: string;
  statecode?: number;
  _createdby_value?: string;
  createdon?: string;
  importmaptype?: number;
  _owninguser_value?: string;
  modifiedon?: string;
  _modifiedonbehalfby_value?: string;
  componentstate?: number;
}
