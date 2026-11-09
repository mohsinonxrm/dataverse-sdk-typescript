/**
 * importmap entity type
 */
export interface importmap {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  entitiesperfile?: number;
  importmapid?: string;
  importmapidunique?: string;
  importmaptype?: number;
  introducedversion?: string;
  ismanaged?: boolean;
  isvalidforimport?: boolean;
  iswizardcreated?: boolean;
  mapcustomizations?: string;
  modifiedon?: string;
  name?: string;
  overwritetime?: string;
  solutionid?: string;
  source?: string;
  sourcetype?: number;
  sourceuseridentifierforsourcecrmuserlink?: string;
  sourceuseridentifierforsourcedatasourceuserlink?: string;
  statecode?: number;
  statuscode?: number;
  targetentity?: number;
  targetuseridentifierforsourcecrmuserlink?: string;
}
