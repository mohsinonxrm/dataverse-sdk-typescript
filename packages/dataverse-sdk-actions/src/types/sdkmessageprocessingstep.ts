import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * sdkmessageprocessingstep entity type
 */
export interface sdkmessageprocessingstep {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _eventhandler_value?: string;
  _fxexpressionid_value?: string;
  _impersonatinguserid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _powerfxruleid_value?: string;
  _sdkmessagefilterid_value?: string;
  _sdkmessageid_value?: string;
  _sdkmessageprocessingstepsecureconfigid_value?: string;
  asyncautodelete?: boolean;
  canbebypassed?: boolean;
  canusereadonlyconnection?: boolean;
  category?: string;
  componentstate?: number;
  configuration?: string;
  createdon?: string;
  customizationlevel?: number;
  description?: string;
  enablepluginprofiler?: boolean;
  eventexpander?: string;
  filteringattributes?: string;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  ishidden?: BooleanManagedProperty;
  ismanaged?: boolean;
  mode?: number;
  modifiedon?: string;
  name?: string;
  overwritetime?: string;
  rank?: number;
  runtimeintegrationproperties?: string;
  sdkmessageprocessingstepid?: string;
  sdkmessageprocessingstepidunique?: string;
  solutionid?: string;
  stage?: number;
  statecode?: number;
  statuscode?: number;
  supporteddeployment?: number;
  versionnumber?: number;
}
