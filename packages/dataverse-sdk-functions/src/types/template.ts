import type { BooleanManagedProperty } from './BooleanManagedProperty.js';

/**
 * template entity type
 */
export interface template {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  body?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  enhancededitorhtml?: string;
  entityimage?: string;
  entityimage_timestamp?: number;
  entityimage_url?: string;
  entityimageid?: string;
  generationtypecode?: number;
  importsequencenumber?: number;
  includetemplateforcopilotrecommendation?: number;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  isenhancededitorenabled?: boolean;
  ismanaged?: boolean;
  ispersonal?: boolean;
  isrecommended?: boolean;
  languagecode?: number;
  mimetype?: string;
  modifiedon?: string;
  msdyn_lineofbusiness?: string;
  msdyn_lineofbusinessmultiselect?: string;
  opencount?: number;
  openrate?: number;
  overwritetime?: string;
  presentationxml?: string;
  replycount?: number;
  replyrate?: number;
  safehtml?: string;
  solutionid?: string;
  subject?: string;
  subjectpresentationxml?: string;
  subjectsafehtml?: string;
  templateid?: string;
  templateidunique?: string;
  templatetypecode?: string;
  title?: string;
  usedcount?: number;
  versionnumber?: number;
}
