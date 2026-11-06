/**
 * appmodulecomponent entity type
 */
export interface appmodulecomponent {
  _appmoduleidunique_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  appmodulecomponentid?: string;
  appmodulecomponentidunique?: string;
  componenttype?: number;
  createdon?: string;
  exchangerate?: number;
  introducedversion?: string;
  isdefault?: boolean;
  ismetadata?: boolean;
  modifiedon?: string;
  objectid?: string;
  overwritetime?: string;
  rootappmodulecomponentid?: string;
  rootcomponentbehavior?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
