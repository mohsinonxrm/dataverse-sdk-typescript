import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_copilotstarterprompt entity type
 */
export interface msdyn_copilotstarterprompt {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_copilotskill_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_copilotstarterpromptid?: string;
  msdyn_name?: string;
  msdyn_section1prompt?: string;
  msdyn_section1title?: string;
  msdyn_section2prompt?: string;
  msdyn_section2title?: string;
  msdyn_section3prompt?: string;
  msdyn_section3title?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
