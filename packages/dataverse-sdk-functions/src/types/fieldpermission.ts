/**
 * fieldpermission entity type
 */
export interface fieldpermission {
  _fieldsecurityprofileid_value?: string;
  _organizationid_value?: string;
  attributelogicalname?: string;
  cancreate?: number;
  canread?: number;
  canreadunmasked?: number;
  canupdate?: number;
  componentstate?: number;
  entityname?: string;
  fieldpermissionid?: string;
  fieldpermissionidunique?: string;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
