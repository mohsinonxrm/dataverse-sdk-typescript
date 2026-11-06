/**
 * annotation entity type
 */
export interface annotation {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _objectid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  annotationid?: string;
  createdon?: string;
  documentbody?: string;
  documentbody_binary?: string;
  filename?: string;
  filesize?: number;
  importsequencenumber?: number;
  isautonomouslycreated?: boolean;
  isdocument?: boolean;
  langid?: string;
  mimetype?: string;
  modifiedon?: string;
  notetext?: string;
  objecttypecode?: string;
  overriddencreatedon?: string;
  prefix?: string;
  stepid?: string;
  subject?: string;
  versionnumber?: number;
}
