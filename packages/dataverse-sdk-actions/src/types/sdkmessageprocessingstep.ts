import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * sdkmessageprocessingstep entity type
 */
export interface sdkmessageprocessingstep {
  solutionid: string;
  iscustomizable: BooleanManagedProperty;
  _sdkmessageid_value: string;
  statuscode: number;
  _fxexpressionid_value: string;
  _sdkmessagefilterid_value: string;
  ishidden: BooleanManagedProperty;
  stage: number;
  _powerfxruleid_value: string;
  overwritetime: string;
  ismanaged: boolean;
  enablepluginprofiler: boolean;
  _impersonatinguserid_value: string;
  category: string;
  rank: number;
  statecode: number;
  sdkmessageprocessingstepidunique: string;
  configuration: string;
  _eventhandler_value: string;
  _sdkmessageprocessingstepsecureconfigid_value: string;
  eventexpander: string;
  _organizationid_value: string;
  _modifiedby_value: string;
  name: string;
  _createdonbehalfby_value: string;
  createdon: string;
  customizationlevel: number;
  filteringattributes: string;
  _modifiedonbehalfby_value: string;
  versionnumber: number;
  canbebypassed: boolean;
  _createdby_value: string;
  description: string;
  sdkmessageprocessingstepid: string;
  mode: number;
  canusereadonlyconnection: boolean;
  modifiedon: string;
  runtimeintegrationproperties: string;
  supporteddeployment: number;
  asyncautodelete: boolean;
  componentstate: number;
  introducedversion: string;
}
