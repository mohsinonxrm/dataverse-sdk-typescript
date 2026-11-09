/**
 * A canonical order for a parsed CSDL schema (#293).
 *
 * Dataverse doesn't promise an order for `$metadata`: two fetches from the same org can list
 * types, properties and operations differently. The generators write what they're given in order,
 * so the same schema could generate different files. `canonicalizeCsdl` sorts everything whose
 * order carries no meaning, so the output depends only on what the schema declares:
 *
 * - entity, complex and enum types, actions, functions and entity sets, by namespace and name
 *   (overloads of one operation name by binding, then by parameters);
 * - the properties and navigation properties of entity and complex types, by name;
 * - enum members by value, then name.
 *
 * Operation parameters keep their CSDL order: the binding parameter comes first, and the order is
 * the one the operation declares (the parameters interface and a function's query string follow it).
 * Entity keys keep their order too.
 *
 * Strings compare by UTF-16 code unit, not `localeCompare`, so the order doesn't depend on the
 * machine's ICU data.
 */
import type {
  CsdlAction,
  CsdlComplexType,
  CsdlEntityType,
  CsdlEnumType,
  CsdlFunction,
  CsdlParameter,
  CsdlSchema,
} from "./csdl-types.js";

/** Compare by UTF-16 code unit. */
export function compareStrings(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** Compare by the first key that differs. */
function byKeys<T>(...keys: Array<(item: T) => string | number>): (a: T, b: T) => number {
  return (a, b) => {
    for (const key of keys) {
      const x = key(a);
      const y = key(b);
      const c =
        typeof x === "number" && typeof y === "number"
          ? x - y
          : compareStrings(String(x), String(y));
      if (c !== 0) return c;
    }
    return 0;
  };
}

const byName = <T extends { name: string }>(a: T, b: T): number => compareStrings(a.name, b.name);
const qualified = (t: { namespace: string; name: string }): string => `${t.namespace}.${t.name}`;
const signature = (params: readonly CsdlParameter[]): string =>
  params.map((p) => `${p.name}:${p.type}`).join(",");

const byOperation = byKeys<CsdlAction | CsdlFunction>(
  qualified,
  (op) => (op.isBound ? 1 : 0),
  (op) => op.bindingParameter?.type ?? "",
  (op) => signature(op.parameters)
);

function sortType<T extends CsdlEntityType | CsdlComplexType>(type: T): T {
  return {
    ...type,
    properties: [...type.properties].sort(byName),
    navigationProperties: [...type.navigationProperties].sort(byName),
  };
}

function sortEnum(type: CsdlEnumType): CsdlEnumType {
  return {
    ...type,
    members: [...type.members].sort(
      byKeys(
        (m) => m.value,
        (m) => m.name
      )
    ),
  };
}

/** `csdl` in canonical order. `csdl` isn't changed. */
export function canonicalizeCsdl(csdl: CsdlSchema): CsdlSchema {
  const byQualified = byKeys<{ namespace: string; name: string }>(qualified);
  const entitySets = csdl.entityContainer
    ? [...csdl.entityContainer.entitySets].sort(
        byKeys(
          (s) => s.name,
          (s) => s.entityType
        )
      )
    : undefined;
  return {
    entityTypes: csdl.entityTypes.map(sortType).sort(byQualified),
    complexTypes: csdl.complexTypes.map(sortType).sort(byQualified),
    enumTypes: csdl.enumTypes.map(sortEnum).sort(byQualified),
    actions: [...csdl.actions].sort(byOperation),
    functions: [...csdl.functions].sort(byOperation),
    entityContainer:
      csdl.entityContainer && entitySets
        ? { ...csdl.entityContainer, entitySets }
        : csdl.entityContainer,
    // Rebuilt from the sorted sets, so a type with two sets maps the same way every time
    entitySetMap: entitySets
      ? new Map(
          entitySets.flatMap((s) => {
            const type = s.entityType.split(".").pop();
            return type ? [[type.toLowerCase(), s.name] as const] : [];
          })
        )
      : new Map(csdl.entitySetMap),
  };
}
