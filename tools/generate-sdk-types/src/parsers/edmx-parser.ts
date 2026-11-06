import { XMLParser } from "fast-xml-parser";
import type {
  CsdlSchema,
  CsdlEntityType,
  CsdlComplexType,
  CsdlEnumType,
  CsdlAction,
  CsdlFunction,
  CsdlProperty,
  CsdlNavigationProperty,
  CsdlParameter,
  CsdlEnumMember,
  CsdlEntityContainer,
  CsdlEntitySet,
} from "./csdl-types.js";

/**
 * Parse EDMX (Entity Data Model XML) from Dataverse $metadata.
 *
 * @param edmxXml - Raw $metadata XML string
 * @returns Parsed CSDL schema
 */
export function parseEdmx(edmxXml: string): CsdlSchema {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    parseAttributeValue: true,
    isArray: (name) => {
      // These can appear multiple times
      return [
        "EntityType",
        "ComplexType",
        "EnumType",
        "Action",
        "Function",
        "Property",
        "NavigationProperty",
        "Parameter",
        "Member",
      ].includes(name);
    },
  });

  const edmx = parser.parse(edmxXml);

  // Navigate to Schema element
  const dataServices = edmx["edmx:Edmx"]["edmx:DataServices"];
  const schemas = Array.isArray(dataServices.Schema) ? dataServices.Schema : [dataServices.Schema];

  const entityTypes: CsdlEntityType[] = [];
  const complexTypes: CsdlComplexType[] = [];
  const enumTypes: CsdlEnumType[] = [];
  const actions: CsdlAction[] = [];
  const functions: CsdlFunction[] = [];
  let entityContainer: CsdlEntityContainer | undefined;

  // Parse all schemas (usually just one, but can be multiple)
  for (const schema of schemas) {
    const namespace = schema["@_Namespace"] ?? "Microsoft.Dynamics.CRM";

    if (schema.EntityType) {
      entityTypes.push(...parseEntityTypes(schema.EntityType, namespace));
    }

    if (schema.ComplexType) {
      complexTypes.push(...parseComplexTypes(schema.ComplexType, namespace));
    }

    if (schema.EnumType) {
      enumTypes.push(...parseEnumTypes(schema.EnumType, namespace));
    }

    if (schema.Action) {
      actions.push(...parseActions(schema.Action, namespace));
    }

    if (schema.Function) {
      functions.push(...parseFunctions(schema.Function, namespace));
    }

    // Parse EntityContainer (only one per schema typically)
    if (schema.EntityContainer && !entityContainer) {
      entityContainer = parseEntityContainer(schema.EntityContainer, namespace);
    }
  }

  // Build entity set map: entity type name -> entity set name
  const entitySetMap = new Map<string, string>();
  if (entityContainer) {
    for (const entitySet of entityContainer.entitySets) {
      // Extract entity type name from full type (e.g., "Microsoft.Dynamics.CRM.workflow" -> "workflow")
      const entityTypeName = entitySet.entityType.split(".").pop();
      if (entityTypeName) {
        entitySetMap.set(entityTypeName.toLowerCase(), entitySet.name);
      }
    }
  }

  return {
    entityTypes,
    complexTypes,
    enumTypes,
    actions,
    functions,
    entityContainer,
    entitySetMap,
  };
}

/**
 * Parse EntityType elements from schema.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseEntityTypes(entityTypeElements: any[], namespace: string): CsdlEntityType[] {
  return entityTypeElements.map((et) => {
    const properties: CsdlProperty[] = [];
    const navigationProperties: CsdlNavigationProperty[] = [];

    if (et.Property) {
      properties.push(...parseProperties(et.Property));
    }

    if (et.NavigationProperty) {
      navigationProperties.push(...parseNavigationProperties(et.NavigationProperty));
    }

    return {
      name: et["@_Name"],
      namespace,
      baseType: et["@_BaseType"],
      abstract: et["@_Abstract"] === true || et["@_Abstract"] === "true",
      key: parseKey(et.Key),
      properties,
      navigationProperties,
    };
  });
}

/**
 * Parse an EntityType's `<Key><PropertyRef Name="..."/></Key>`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseKey(keyElement: any): string[] {
  if (!keyElement) return [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const refs: unknown = keyElement.PropertyRef;
  const list = Array.isArray(refs) ? refs : refs ? [refs] : [];
  return list.map((r) => String((r as Record<string, unknown>)["@_Name"]));
}

/**
 * Parse ComplexType elements from schema.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseComplexTypes(complexTypeElements: any[], namespace: string): CsdlComplexType[] {
  return complexTypeElements.map((ct) => {
    const properties: CsdlProperty[] = [];

    if (ct.Property) {
      properties.push(...parseProperties(ct.Property));
    }

    return {
      name: ct["@_Name"],
      namespace,
      baseType: ct["@_BaseType"],
      abstract: ct["@_Abstract"] === true || ct["@_Abstract"] === "true",
      properties,
      // Entity-valued members (#231), such as PrincipalAccess.Principal
      navigationProperties: ct.NavigationProperty
        ? parseNavigationProperties(ct.NavigationProperty)
        : [],
    };
  });
}

/**
 * Parse EnumType elements from schema.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseEnumTypes(enumTypeElements: any[], namespace: string): CsdlEnumType[] {
  return enumTypeElements.map((et) => {
    const members: CsdlEnumMember[] = [];

    if (et.Member) {
      members.push(...parseEnumMembers(et.Member));
    }

    return {
      name: et["@_Name"],
      namespace,
      isFlags: et["@_IsFlags"] === true || et["@_IsFlags"] === "true",
      members,
    };
  });
}

/**
 * Parse Action elements from schema.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseActions(actionElements: any[], namespace: string): CsdlAction[] {
  return actionElements.map((action) => {
    const isBound = action["@_IsBound"] === true || action["@_IsBound"] === "true";
    const parameters: CsdlParameter[] = [];
    let bindingParameter: CsdlParameter | undefined;

    if (action.Parameter) {
      const parsedParams = parseParameters(action.Parameter);
      if (isBound && parsedParams.length > 0) {
        bindingParameter = parsedParams[0];
        parameters.push(...parsedParams.slice(1));
      } else {
        parameters.push(...parsedParams);
      }
    }

    return {
      name: action["@_Name"],
      namespace,
      isBound,
      bindingParameter,
      parameters,
      returnType: action.ReturnType?.["@_Type"],
    };
  });
}

/**
 * Parse Function elements from schema.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseFunctions(functionElements: any[], namespace: string): CsdlFunction[] {
  return functionElements.map((func) => {
    const isBound = func["@_IsBound"] === true || func["@_IsBound"] === "true";
    const parameters: CsdlParameter[] = [];
    let bindingParameter: CsdlParameter | undefined;

    if (func.Parameter) {
      const parsedParams = parseParameters(func.Parameter);
      if (isBound && parsedParams.length > 0) {
        bindingParameter = parsedParams[0];
        parameters.push(...parsedParams.slice(1));
      } else {
        parameters.push(...parsedParams);
      }
    }

    return {
      name: func["@_Name"],
      namespace,
      isBound,
      bindingParameter,
      parameters,
      returnType: func.ReturnType?.["@_Type"],
    };
  });
}

/**
 * Parse Property elements.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseProperties(propertyElements: any[]): CsdlProperty[] {
  return propertyElements.map((prop) => ({
    name: prop["@_Name"],
    type: prop["@_Type"],
    nullable: prop["@_Nullable"],
    maxLength: prop["@_MaxLength"],
    precision: prop["@_Precision"],
    scale: prop["@_Scale"],
  }));
}

/**
 * Parse NavigationProperty elements.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseNavigationProperties(navPropElements: any[]): CsdlNavigationProperty[] {
  return navPropElements.map((nav) => ({
    name: nav["@_Name"],
    type: nav["@_Type"],
    partner: nav["@_Partner"],
    containsTarget: nav["@_ContainsTarget"],
    nullable: nav["@_Nullable"],
  }));
}

/**
 * Parse Parameter elements.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseParameters(parameterElements: any[]): CsdlParameter[] {
  return parameterElements.map((param) => ({
    name: param["@_Name"],
    type: param["@_Type"],
    nullable: param["@_Nullable"],
  }));
}

/**
 * Parse EnumType Member elements.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseEnumMembers(memberElements: any[]): CsdlEnumMember[] {
  return memberElements.map((member) => ({
    name: member["@_Name"],
    value: parseInt(member["@_Value"], 10),
  }));
}

/**
 * Parse EntityContainer element.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseEntityContainer(containerElement: any, _namespace: string): CsdlEntityContainer {
  const entitySets: CsdlEntitySet[] = [];

  if (containerElement.EntitySet) {
    const entitySetElements = Array.isArray(containerElement.EntitySet)
      ? containerElement.EntitySet
      : [containerElement.EntitySet];

    for (const es of entitySetElements) {
      entitySets.push({
        name: es["@_Name"],
        entityType: es["@_EntityType"],
      });
    }
  }

  return {
    name: containerElement["@_Name"] ?? "Container",
    entitySets,
  };
}
