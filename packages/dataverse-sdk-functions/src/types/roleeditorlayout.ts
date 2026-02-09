import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * roleeditorlayout entity type
 */
export interface roleeditorlayout {
  modifiedon: string;
  entitylogicalname: string;
  taborder: number;
  ismanaged: boolean;
  iscustomizable: BooleanManagedProperty;
  _roleeditorlayouthierarchyid_value: string;
  _createdonbehalfby_value: string;
  _organizationid_value: string;
  componentidunique: string;
  _createdby_value: string;
  utcconversiontimezonecode: number;
  _modifiedonbehalfby_value: string;
  name: string;
  roleeditorlayoutid: string;
  timezoneruleversionnumber: number;
  isprivacyrelated: boolean;
  solutionid: string;
  itemtype: number;
  componentstate: number;
  overwritetime: string;
  privilegename: string;
  displayname: string;
  _modifiedby_value: string;
  createdon: string;
  overriddencreatedon: string;
}
