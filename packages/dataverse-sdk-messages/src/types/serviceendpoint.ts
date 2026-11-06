import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * serviceendpoint entity type
 */
export interface serviceendpoint {
  connectionmode?: number;
  ismanaged?: boolean;
  solutionid?: string;
  messageformat?: number;
  introducedversion?: string;
  iscustomizable?: BooleanManagedProperty;
  issastokenset?: boolean;
  _modifiedonbehalfby_value?: string;
  modifiedon?: string;
  sastoken?: string;
  _modifiedby_value?: string;
  _keyvaultreferenceid_value?: string;
  schematype?: number;
  serviceendpointidunique?: string;
  componentstate?: number;
  path?: string;
  runtimeintegrationproperties?: string;
  issaskeyset?: boolean;
  description?: string;
  namespaceformat?: number;
  usekeyvaultconfiguration?: boolean;
  _managedidentityid_value?: string;
  _organizationid_value?: string;
  contract?: number;
  _createdby_value?: string;
  serviceendpointid?: string;
  authvalue?: string;
  url?: string;
  name?: string;
  solutionnamespace?: string;
  messagecharset?: number;
  isauthvalueset?: boolean;
  namespaceaddress?: string;
  userclaim?: number;
  createdon?: string;
  _createdonbehalfby_value?: string;
  saskeyname?: string;
  overwritetime?: string;
  saskey?: string;
  authtype?: number;
}
