import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * template entity type
 */
export interface template {
  replyrate?: number;
  includetemplateforcopilotrecommendation?: number;
  usedcount?: number;
  templateidunique?: string;
  description?: string;
  overwritetime?: string;
  subject?: string;
  _createdby_value?: string;
  _owninguser_value?: string;
  versionnumber?: number;
  languagecode?: number;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _modifiedonbehalfby_value?: string;
  componentstate?: number;
  enhancededitorhtml?: string;
  isenhancededitorenabled?: boolean;
  opencount?: number;
  ispersonal?: boolean;
  entityimageid?: string;
  isrecommended?: boolean;
  mimetype?: string;
  safehtml?: string;
  ismanaged?: boolean;
  _createdonbehalfby_value?: string;
  createdon?: string;
  entityimage_timestamp?: number;
  iscustomizable?: BooleanManagedProperty;
  templatetypecode?: string;
  replycount?: number;
  _ownerid_value?: string;
  subjectpresentationxml?: string;
  introducedversion?: string;
  importsequencenumber?: number;
  generationtypecode?: number;
  title?: string;
  entityimage?: string;
  solutionid?: string;
  entityimage_url?: string;
  subjectsafehtml?: string;
  body?: string;
  modifiedon?: string;
  presentationxml?: string;
  openrate?: number;
  msdyn_lineofbusiness?: string;
  _modifiedby_value?: string;
  msdyn_lineofbusinessmultiselect?: string;
  templateid?: string;
}
