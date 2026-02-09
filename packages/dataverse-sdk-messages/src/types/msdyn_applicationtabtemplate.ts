import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_applicationtabtemplate entity type
 */
export interface msdyn_applicationtabtemplate {
  statuscode: number;
  _createdby_value: string;
  msdyn_applicationtabtemplateid: string;
  msdyn_pagetype: number;
  utcconversiontimezonecode: number;
  msdyn_title: string;
  _createdonbehalfby_value: string;
  createdon: string;
  _owninguser_value: string;
  ismanaged: boolean;
  _modifiedby_value: string;
  overriddencreatedon: string;
  componentidunique: string;
  _ownerid_value: string;
  msdyn_name: string;
  msdyn_pinned: boolean;
  iscustomizable: BooleanManagedProperty;
  msdyn_uniquename: string;
  componentstate: number;
  _modifiedonbehalfby_value: string;
  versionnumber: number;
  solutionid: string;
  overwritetime: string;
  msdyn_description: string;
  _owningbusinessunit_value: string;
  statecode: number;
  _owningteam_value: string;
  modifiedon: string;
  importsequencenumber: number;
  msdyn_templateparameters: string;
  timezoneruleversionnumber: number;
}
