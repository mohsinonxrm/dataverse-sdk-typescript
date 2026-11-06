import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * maskingrule entity type
 */
export interface maskingrule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  description?: string;
  displayname?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  maskedcharacter?: string;
  maskedrichtestdata?: string;
  maskedtestdata?: string;
  maskingruleid?: string;
  modifiedon?: string;
  name?: string;
  overwritetime?: string;
  regularexpression?: string;
  richtestdata?: string;
  solutionid?: string;
  testdata?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
}
