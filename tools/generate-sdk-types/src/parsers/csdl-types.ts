/**
 * CSDL (Common Schema Definition Language) type definitions.
 *
 * Represents the parsed structure of Dataverse $metadata.
 */

export interface CsdlSchema {
  entityTypes: CsdlEntityType[];
  complexTypes: CsdlComplexType[];
  enumTypes: CsdlEnumType[];
  actions: CsdlAction[];
  functions: CsdlFunction[];
  entityContainer?: CsdlEntityContainer;
  /**
   * Map from entity type name to entity set name
   * e.g., "workflow" -> "workflows", "account" -> "accounts"
   */
  entitySetMap: Map<string, string>;
}

export interface CsdlEntityType {
  name: string;
  namespace: string;
  baseType?: string;
  /** `Abstract="true"`: the type has no instances of its own, only derived types do. */
  abstract?: boolean;
  properties: CsdlProperty[];
  navigationProperties: CsdlNavigationProperty[];
}

export interface CsdlComplexType {
  name: string;
  namespace: string;
  baseType?: string;
  /** `Abstract="true"`: the type has no instances of its own, only derived types do. */
  abstract?: boolean;
  properties: CsdlProperty[];
}

export interface CsdlProperty {
  name: string;
  type: string;
  /**
   * The CSDL `Nullable` facet as written; `undefined` when absent. CSDL's default is nullable, so
   * only `false` makes a property required.
   */
  nullable?: boolean;
  maxLength?: number;
  precision?: number;
  scale?: number;
}

export interface CsdlNavigationProperty {
  name: string;
  type: string;
  partner?: string;
  containsTarget?: boolean;
}

export interface CsdlEnumType {
  name: string;
  namespace: string;
  members: CsdlEnumMember[];
}

export interface CsdlEnumMember {
  name: string;
  value: number;
}

export interface CsdlAction {
  name: string;
  namespace: string;
  isBound: boolean;
  bindingParameter?: CsdlParameter;
  parameters: CsdlParameter[];
  returnType?: string;
}

export interface CsdlFunction {
  name: string;
  namespace: string;
  isBound: boolean;
  bindingParameter?: CsdlParameter;
  parameters: CsdlParameter[];
  returnType?: string;
}

export interface CsdlParameter {
  name: string;
  type: string;
  nullable?: boolean;
}

export interface CsdlEntitySet {
  name: string;
  entityType: string;
}

export interface CsdlEntityContainer {
  name: string;
  entitySets: CsdlEntitySet[];
}
