import type { BooleanManagedProperty } from './BooleanManagedProperty.js';

/**
 * msdyn_aimodel entity type
 */
export interface msdyn_aimodel {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_activerunconfigurationid_value?: string;
  _msdyn_aimodelcatalog_value?: string;
  _msdyn_retrainworkflowid_value?: string;
  _msdyn_scheduleinferenceworkflowid_value?: string;
  _msdyn_templateid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_aimodelid?: string;
  msdyn_aimodelidunique?: string;
  msdyn_modelcreationcontext?: string;
  msdyn_name?: string;
  msdyn_sharewithorganizationoncreate?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
