/**
 * Enum values in action and message request bodies (#232).
 *
 * The Web API reads an enum member in a JSON body only as a string: `"ReadAccess"`, or for a flags
 * enum `"ReadAccess, WriteAccess"`. A number is rejected with 400 ("Cannot read the value '1' as a
 * quoted JSON string value"). The generated enums are numeric (functions combine them with `|`),
 * so the generated `internal/enumBody.ts` turns the numbers at enum positions of a body parameter
 * into member names. It knows the positions from two tables taken from the CSDL: the members of each
 * enum a body can hold, and, for each complex type that holds one (directly, below, or in a derived
 * type), which properties are enums or such complex types.
 *
 * Functions take the same values in their JSON parameter aliases (complex types and collections,
 * `?@p1={"Criteria":{...}}`) and Dataverse reads enum members there only by name too (#358), so the
 * functions package gets its own `internal/enumBody.ts`, with the tables its parameters reach.
 */
import type { CsdlComplexType, CsdlSchema } from "../parsers/csdl-types.js";

const CRM = "Microsoft.Dynamics.CRM";

/** Name of the generated module, under `internal/`. */
export const ENUM_BODY_MODULE = "enumBody";

interface BodyEnums {
  /** Enum name -> flags, and members in CSDL order. */
  enums: Map<string, { flags: boolean; members: Array<[string, number]> }>;
  /** Complex type name -> property -> enum or complex type name (sorted by property). */
  types: Map<string, Array<[string, string]>>;
}

/**
 * Whose parameters the tables cover: the actions' bodies (actions and messages packages), or the
 * functions' JSON parameter aliases (#358).
 */
export type EnumBodyScope = "actions" | "functions";

const cache = new WeakMap<CsdlSchema, Map<EnumBodyScope, BodyEnums>>();

function localName(type: string): string {
  return type
    .replace(/^Collection\((.*)\)$/, "$1")
    .replace(/^mscrm\.|^Microsoft\.Dynamics\.CRM\./, "");
}

const byName = (a: [string, unknown], b: [string, unknown]): number =>
  a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;

/**
 * The parameter types the tables start from. A function's enum parameter is an OData enum literal
 * (`Microsoft.Dynamics.CRM.EntityFilters'3'`), not JSON, so only its complex and collection
 * parameters count.
 */
function rootTypes(csdl: CsdlSchema, scope: EnumBodyScope): string[] {
  if (scope === "actions") return csdl.actions.flatMap((a) => a.parameters.map((p) => p.type));
  return csdl.functions
    .flatMap((f) => f.parameters.map((p) => p.type))
    .filter(
      (t) => t.startsWith("Collection(") || !csdl.enumTypes.some((e) => e.name === localName(t))
    );
}

/** The enums and complex types that put an enum value in a body, from the CSDL. */
function bodyEnums(csdl: CsdlSchema, scope: EnumBodyScope): BodyEnums {
  const cached = cache.get(csdl)?.get(scope);
  if (cached) return cached;
  const allEnums = new Map(
    csdl.enumTypes.filter((e) => e.namespace === CRM).map((e) => [e.name, e] as const)
  );
  const complex = new Map<string, CsdlComplexType>(
    csdl.complexTypes.filter((c) => c.namespace === CRM).map((c) => [c.name, c] as const)
  );
  const derived = new Map<string, string[]>();
  for (const c of complex.values()) {
    if (!c.baseType) continue;
    const base = localName(c.baseType);
    derived.set(base, [...(derived.get(base) ?? []), c.name]);
  }
  /** Own and inherited properties of a complex type. */
  const propertiesOf = (name: string): Array<{ name: string; type: string }> => {
    const props: Array<{ name: string; type: string }> = [];
    for (let c = complex.get(name), depth = 0; c && depth < 20; depth++) {
      props.push(...c.properties);
      c = c.baseType ? complex.get(localName(c.baseType)) : undefined;
    }
    return props;
  };

  // A complex type holds an enum when a property is an enum or such a complex type, or when a
  // derived type does (a value of the base type can be one of them). Iterate to a fixed point, so
  // recursive types (QueryExpression.SubQueryExpression) resolve.
  const holds = new Set<string>();
  for (let changed = true; changed;) {
    changed = false;
    for (const name of complex.keys()) {
      if (holds.has(name)) continue;
      const hit =
        propertiesOf(name).some((p) => {
          const t = localName(p.type);
          return allEnums.has(t) || holds.has(t);
        }) || (derived.get(name) ?? []).some((d) => holds.has(d));
      if (hit) {
        holds.add(name);
        changed = true;
      }
    }
  }

  const types = new Map<string, Array<[string, string]>>();
  const used = new Set<string>();
  // Only what a parameter in scope can reach: its type, the types of their properties, and
  // their derived types.
  const pending: string[] = [];
  const reach = (t: string): void => {
    if (allEnums.has(t)) used.add(t);
    else if (holds.has(t) && !types.has(t)) {
      types.set(t, []);
      pending.push(t);
    }
  };
  for (const type of rootTypes(csdl, scope)) reach(localName(type));
  for (let name = pending.pop(); name !== undefined; name = pending.pop()) {
    const members = new Map<string, string>();
    for (const p of propertiesOf(name)) {
      const t = localName(p.type);
      if (allEnums.has(t) || holds.has(t)) members.set(p.name, t);
      reach(t);
    }
    for (const d of derived.get(name) ?? []) reach(d);
    types.set(name, [...members].sort(byName));
  }
  const sorted = [...types].sort(byName);
  types.clear();
  for (const [name, members] of sorted) types.set(name, members);
  const enums: BodyEnums["enums"] = new Map();
  for (const name of [...used].sort()) {
    const e = allEnums.get(name);
    if (!e) continue;
    enums.set(name, {
      flags: e.isFlags === true,
      members: e.members.map((m) => [m.name, m.value] as [string, number]),
    });
  }
  const result = { enums, types };
  const scopes = cache.get(csdl) ?? new Map<EnumBodyScope, BodyEnums>();
  scopes.set(scope, result);
  cache.set(csdl, scopes);
  return result;
}

/**
 * The type to pass to `enumBody` for a body parameter of `csdlType` (or, with `scope` "functions",
 * a function's JSON parameter): the enum or complex type name, or `undefined` when no value of the
 * type can hold an enum.
 */
export function bodyEnumType(
  csdl: CsdlSchema,
  csdlType: string,
  scope: EnumBodyScope = "actions"
): string | undefined {
  const name = localName(csdlType);
  const { enums, types } = bodyEnums(csdl, scope);
  return enums.has(name) || types.has(name) ? name : undefined;
}

/** Source of the generated `internal/enumBody.ts`, with the tables of `scope`. */
export function enumBodySource(csdl: CsdlSchema, scope: EnumBodyScope = "actions"): string {
  const { enums, types } = bodyEnums(csdl, scope);
  const enumLines = [...enums]
    .map(([name, e]) => {
      const members = e.members.map(([m, v]) => `${JSON.stringify(m)}: ${String(v)}`).join(", ");
      return `  ${name}: [${String(e.flags)}, { ${members} }],`;
    })
    .join("\n");
  const typeLines = [...types]
    .map(([name, props]) => {
      const body = props.map(([p, t]) => `${JSON.stringify(p)}: ${JSON.stringify(t)}`).join(", ");
      return `  ${name}: ${body ? `{ ${body} }` : "{}"},`;
    })
    .join("\n");
  const header =
    scope === "functions"
      ? `/**
 * Enum values in JSON function parameters.
 * Generated by tools/generate-sdk-types from the CSDL $metadata. Do not edit by hand.
 *
 * A complex or collection function parameter is JSON in a parameter alias
 * (\`?@p1={"Criteria":{"FilterOperator":"And"}}\`), and the Web API reads an enum member in it only
 * by name: \`"Equals"\`, or for a flags enum \`"ReadAccess, WriteAccess"\`. The generated enums are
 * numeric, so the generated functions pass each such parameter that can hold an enum through
 * {@link enumBody}, which writes member names, before formatting the alias.
 */`
      : `/**
 * Enum values in request bodies.
 * Generated by tools/generate-sdk-types from the CSDL $metadata. Do not edit by hand.
 *
 * The Web API reads an enum member in a JSON body only as a string: \`"ReadAccess"\`, or for a flags
 * enum \`"ReadAccess, WriteAccess"\`. It rejects a number ("Cannot read the value '1' as a quoted
 * JSON string value"). The generated enums are numeric, so the generated operations pass each body
 * parameter that can hold an enum through {@link enumBody}, which writes member names.
 */`;
  return `${header}

/** The enums a body can hold: whether it is a flags enum, and its members. */
const ENUMS: Record<string, [flags: boolean, members: Record<string, number>]> = {
${enumLines}
};

/**
 * The complex types that can hold an enum value: each property that is an enum, or a complex type
 * listed here. Inherited properties are included; a base type whose derived types hold one is
 * listed too, and the value's \`@odata.type\` picks the derived type.
 */
const TYPES: Record<string, Record<string, string>> = {
${typeLines}
};

/** The member name(s) of an enum value, or the number as a string when no member matches. */
function enumName(value: number, [flags, members]: [boolean, Record<string, number>]): string {
  const entries = Object.entries(members);
  const exact = entries.find(([, v]) => v === value);
  if (exact) return exact[0];
  if (flags && Number.isInteger(value) && value > 0 && value <= 0x7fffffff) {
    let rest = value;
    const names: Array<[string, number]> = [];
    for (const [name, v] of [...entries].sort((a, b) => b[1] - a[1])) {
      if (v > 0 && (rest & v) === v) {
        names.push([name, v]);
        rest &= ~v;
      }
    }
    if (rest === 0) {
      return names
        .sort((a, b) => a[1] - b[1])
        .map(([name]) => name)
        .join(", ");
    }
  }
  // Dataverse also reads the number as a string.
  return String(value);
}

/**
 * A body parameter with its enum values as member names. \`type\` is the parameter's enum or complex
 * type. The value isn't changed: objects and arrays that hold an enum are copied. A string (a
 * member name) is left as it is.
 */
export function enumBody(value: unknown, type: string): unknown {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map((item: unknown) => enumBody(item, type));
  const members = Object.hasOwn(ENUMS, type) ? ENUMS[type] : undefined;
  if (members) return typeof value === "number" ? enumName(value, members) : value;
  if (typeof value !== "object") return value;
  const record = value as Record<string, unknown>;
  const odataType = record["@odata.type"];
  const actual =
    typeof odataType === "string" ? odataType.replace(/^#?Microsoft\\.Dynamics\\.CRM\\./, "") : type;
  const properties = Object.hasOwn(TYPES, actual) ? TYPES[actual] : undefined;
  if (!properties) return value;
  let copy: Record<string, unknown> | undefined;
  for (const [property, propertyType] of Object.entries(properties)) {
    if (!(property in record)) continue;
    const before = record[property];
    const after = enumBody(before, propertyType);
    if (after !== before) {
      copy ??= { ...record };
      copy[property] = after;
    }
  }
  return copy ?? value;
}
`;
}
