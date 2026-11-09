/**
 * Type inheritance helpers (CSDL `BaseType` / `Abstract`).
 *
 * A parameter declared with a base type (for example `QueryExpressionToFetchXml(Query: QueryBase)`)
 * takes a value of one of the derived types, and the request body must say which one with
 * `@odata.type`. For each such base type the generator emits a `Typed<Base>` union of the concrete
 * types, each with a required `@odata.type` literal, and uses it for those parameters (#73).
 */
import type { CsdlSchema } from "../parsers/csdl-types.js";
import { extractCollectionType, toPascalCase } from "./typescript-writer.js";

const CRM_NAMESPACE = "Microsoft.Dynamics.CRM";

/** Abstract entity bases that are not generated (entity payloads use EntityReference for them). */
export const SYSTEM_ENTITIES = ["crmbaseentity", "principal", "crmmodelbaseentity", "expando"];

interface TypeNode {
  name: string;
  abstract: boolean;
  baseType?: string;
  hasProperties: boolean;
}

const cache = new WeakMap<CsdlSchema, Map<string, TypeNode>>();

/** The generated (CRM namespace, non-system) complex and entity types, by name. */
function typeNodes(csdl: CsdlSchema): Map<string, TypeNode> {
  let nodes = cache.get(csdl);
  if (nodes) return nodes;
  nodes = new Map();
  for (const t of [...csdl.complexTypes, ...csdl.entityTypes]) {
    if (t.namespace !== CRM_NAMESPACE || t.name.endsWith("[]")) continue;
    if (SYSTEM_ENTITIES.includes(t.name.toLowerCase())) continue;
    if (nodes.has(t.name)) continue;
    nodes.set(t.name, {
      name: t.name,
      abstract: t.abstract === true,
      baseType: t.baseType ? shortTypeName(t.baseType) : undefined,
      hasProperties: t.properties.length > 0,
    });
  }
  cache.set(csdl, nodes);
  return nodes;
}

/** `mscrm.QueryBase` / `Microsoft.Dynamics.CRM.QueryBase` -> `QueryBase`; other namespaces -> undefined. */
function shortTypeName(qualified: string): string | undefined {
  if (qualified.startsWith("mscrm.")) return qualified.slice("mscrm.".length);
  if (qualified.startsWith(`${CRM_NAMESPACE}.`)) return qualified.slice(CRM_NAMESPACE.length + 1);
  return undefined;
}

/**
 * The generated base type a type extends, or undefined (no base, or a system base such as
 * `crmbaseentity` that isn't generated).
 */
export function generatedBaseType(csdl: CsdlSchema, typeName: string): string | undefined {
  const base = typeNodes(csdl).get(typeName)?.baseType;
  return base && typeNodes(csdl).has(base) ? base : undefined;
}

/** True when the type, or one of its generated bases, declares at least one property. */
function hasAnyProperties(csdl: CsdlSchema, typeName: string): boolean {
  const nodes = typeNodes(csdl);
  for (let t = nodes.get(typeName); t; t = t.baseType ? nodes.get(t.baseType) : undefined) {
    if (t.hasProperties) return true;
  }
  return false;
}

/**
 * The concrete types a value declared as `typeName` can be: the type itself (unless it is abstract
 * or has no properties at all) and every non-abstract type derived from it, sorted by name.
 * Returns an empty list when no generated type derives from `typeName`.
 */
export function concreteTypesOf(csdl: CsdlSchema, typeName: string): string[] {
  const nodes = typeNodes(csdl);
  const self = nodes.get(typeName);
  if (!self) return [];
  const derived: string[] = [];
  for (const node of nodes.values()) {
    if (node.name === typeName || node.abstract) continue;
    for (let b = node.baseType; b; b = nodes.get(b)?.baseType) {
      if (b === typeName) {
        derived.push(node.name);
        break;
      }
    }
  }
  if (derived.length === 0) return [];
  if (!self.abstract && hasAnyProperties(csdl, typeName)) derived.push(typeName);
  return derived.sort();
}

/** Name of the generated `@odata.type` union for a polymorphic base type. */
export function typedUnionName(typeName: string): string {
  return `Typed${toPascalCase(typeName)}`;
}

/**
 * For a parameter type whose (element) type is a polymorphic generated type, the `Typed<Base>`
 * union to use instead (with `[]` for collections). Undefined for every other type.
 */
export function polymorphicParameterType(
  csdl: CsdlSchema,
  paramType: string
): { tsType: string; union: string } | undefined {
  const element = shortTypeName(extractCollectionType(paramType));
  if (!element || concreteTypesOf(csdl, element).length === 0) return undefined;
  const union = typedUnionName(element);
  return { tsType: paramType.startsWith("Collection(") ? `${union}[]` : union, union };
}
