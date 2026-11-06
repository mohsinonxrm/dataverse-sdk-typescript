import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * serviceendpoint entity type
 */
export interface serviceendpoint {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _keyvaultreferenceid_value?: string;
  _managedidentityid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  authtype?: number;
  authvalue?: string;
  componentstate?: number;
  connectionmode?: number;
  contract?: number;
  createdon?: string;
  description?: string;
  introducedversion?: string;
  isauthvalueset?: boolean;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  issaskeyset?: boolean;
  issastokenset?: boolean;
  messagecharset?: number;
  messageformat?: number;
  modifiedon?: string;
  name?: string;
  namespaceaddress?: string;
  namespaceformat?: number;
  overwritetime?: string;
  path?: string;
  runtimeintegrationproperties?: string;
  saskey?: string;
  saskeyname?: string;
  sastoken?: string;
  schematype?: number;
  serviceendpointid?: string;
  serviceendpointidunique?: string;
  solutionid?: string;
  solutionnamespace?: string;
  url?: string;
  usekeyvaultconfiguration?: boolean;
  userclaim?: number;
}
