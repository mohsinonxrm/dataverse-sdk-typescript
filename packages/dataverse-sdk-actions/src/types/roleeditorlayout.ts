import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * roleeditorlayout entity type
 */
export interface roleeditorlayout {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _roleeditorlayouthierarchyid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  displayname?: string;
  entitylogicalname?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  isprivacyrelated?: boolean;
  itemtype?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  privilegename?: string;
  roleeditorlayoutid?: string;
  solutionid?: string;
  taborder?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
}
