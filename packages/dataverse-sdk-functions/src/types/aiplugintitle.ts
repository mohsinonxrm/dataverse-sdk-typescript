import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * aiplugintitle entity type
 */
export interface aiplugintitle {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  accentcolor?: string;
  aiplugintitleid?: string;
  baseartifactid?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  developername?: string;
  displayname?: string;
  icon?: string;
  iconscolorimage?: string;
  iconscolorimage_timestamp?: number;
  iconscolorimage_url?: string;
  iconscolorimageid?: string;
  iconsoutlineimage?: string;
  iconsoutlineimage_timestamp?: number;
  iconsoutlineimage_url?: string;
  iconsoutlineimageid?: string;
  importsequencenumber?: number;
  iscustom?: boolean;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  plugintitleversion?: string;
  privacyurl?: string;
  shortdescription?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  termsofuseurl?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  websiteurl?: string;
}
