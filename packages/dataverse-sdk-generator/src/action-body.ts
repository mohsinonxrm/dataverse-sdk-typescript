/**
 * Action request bodies (#361), the same contract as the in-repo actions (#232, #74):
 *
 * - The Web API reads an enum member in a JSON body only as a string: `"ReadAccess"`, or for a
 *   flags enum `"ReadAccess, WriteAccess"`. A number is rejected with 400. A generated enum's
 *   values are its member names (#479), except a flags enum's, which are numbers so that they
 *   combine with `|`: flags values become member names.
 * - An entity parameter is sent as an entity: a reference (`createEntityReference()`) as
 *   `@odata.type` and its primary key, and a record with its lookups set with `@odata.bind`. A
 *   generated entity takes an `EntityReference` for a lookup, so a record goes through
 *   `formatEntityForWrite()`.
 *
 * The generated `internal/actionBody.ts` does both, from tables taken from the CSDL: the members
 * of each flags enum a body can hold, the entity types it can hold, and, for each complex type that
 * holds one of them (directly, below, or in a derived type), which properties do.
 */
import type { SchemaModel } from "./schema-model.js";
import type { ComplexType, PropertyType } from "./types.js";

/** Name of the generated module, under `internal/`. */
export const ACTION_BODY_MODULE = "actionBody";

/** What a request body can hold that has to be converted, reachable from the actions' parameters. */
export interface ActionBodyTables {
  /** Flags enum name -> members in CSDL order. Other enums' values are already member names. */
  enums: Map<string, Array<[string, number]>>;
  /** Complex type name -> property -> enum, entity or complex type name (sorted by property). */
  types: Map<string, Array<[string, string]>>;
  /** Entity types (tables and abstract ones such as `crmbaseentity`). */
  entities: Set<string>;
}

const byName = (a: [string, unknown], b: [string, unknown]): number =>
  a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;

/** The type a property or parameter holds: `account` for `Collection(mscrm.account)`. */
function elementName(type: string): string {
  return type
    .replace(/^Collection\((.*)\)$/, "$1")
    .replace(/^mscrm\.|^Microsoft\.Dynamics\.CRM\./, "");
}

/**
 * Whose parameters the tables cover: the actions' request bodies (enums and entities), or the
 * functions' JSON parameter aliases (complex types and collections, `?@p1={...}`), where
 * Dataverse also reads an enum member only by name (#358). A function's enum parameter is an
 * OData enum literal, and an entity in a function parameter is written by
 * `formatParameterAlias()`, so for functions only enums count.
 */
export type BodyScope = "actions" | "functions";

/** The enums, entities and complex types the actions' bodies (or functions' JSON parameters) can hold. */
export function actionBodyTables(
  model: SchemaModel,
  scope: BodyScope = "actions"
): ActionBodyTables {
  const allEnums = new Set(model.EnumTypes.map((e) => e.Name));
  // Only a flags enum's values are numbers to convert; the others are member names already (#479)
  const flagsEnums = new Map(
    model.EnumTypes.filter((e) => e.IsFlags === true).map((e) => [e.Name, e] as const)
  );
  const complex = new Map<string, ComplexType>(model.ComplexTypes.map((c) => [c.Name, c]));
  const isEntity = (name: string): boolean =>
    scope === "actions" && model.AllEntityTypeNames.has(name);
  const derived = new Map<string, string[]>();
  for (const c of complex.values()) {
    if (!c.BaseType) continue;
    derived.set(c.BaseType, [...(derived.get(c.BaseType) ?? []), c.Name]);
  }
  /** Own and inherited properties of a complex type. */
  const propertiesOf = (name: string): PropertyType[] => {
    const props: PropertyType[] = [];
    for (let c = complex.get(name), depth = 0; c && depth < 20; depth++) {
      props.push(...c.Properties);
      c = c.BaseType ? complex.get(c.BaseType) : undefined;
    }
    return props;
  };

  // A complex type holds something to convert when a property is a flags enum, an entity or such
  // a complex type, or when a derived type does (a value of the base type can be one of them).
  // Iterate to a fixed point, so recursive types resolve.
  const holds = new Set<string>();
  for (let changed = true; changed;) {
    changed = false;
    for (const name of complex.keys()) {
      if (holds.has(name)) continue;
      const hit =
        propertiesOf(name).some((p) => {
          const t = elementName(p.Type);
          return flagsEnums.has(t) || isEntity(t) || holds.has(t);
        }) || (derived.get(name) ?? []).some((d) => holds.has(d));
      if (hit) {
        holds.add(name);
        changed = true;
      }
    }
  }

  const types = new Map<string, Array<[string, string]>>();
  const usedEnums = new Set<string>();
  const entities = new Set<string>();
  const pending: string[] = [];
  const reach = (t: string): void => {
    if (flagsEnums.has(t)) usedEnums.add(t);
    else if (isEntity(t)) entities.add(t);
    else if (holds.has(t) && !types.has(t)) {
      types.set(t, []);
      pending.push(t);
    }
  };
  const roots =
    scope === "actions"
      ? model.Actions.flatMap((a) => a.Parameters.map((p) => p.Type))
      : model.Functions.flatMap((f) => f.Parameters.map((p) => p.Type)).filter(
          (t) => t.startsWith("Collection(") || !allEnums.has(elementName(t))
        );
  for (const type of roots) reach(elementName(type));
  for (let name = pending.pop(); name !== undefined; name = pending.pop()) {
    const members = new Map<string, string>();
    for (const p of propertiesOf(name)) {
      const t = elementName(p.Type);
      if (flagsEnums.has(t) || isEntity(t) || holds.has(t)) members.set(p.Name, t);
      reach(t);
    }
    for (const d of derived.get(name) ?? []) reach(d);
    types.set(name, [...members].sort(byName));
  }

  const enums: ActionBodyTables["enums"] = new Map();
  for (const name of [...usedEnums].sort()) {
    const e = flagsEnums.get(name);
    if (!e) continue;
    enums.set(
      name,
      e.Members.map((m) => [m.Name, m.Value] as [string, number])
    );
  }
  return {
    enums,
    types: new Map([...types].sort(byName)),
    entities: new Set([...entities].sort()),
  };
}

/**
 * The type to pass to `bodyValue` for a parameter of `csdlType`: the enum, entity or complex type
 * name, or `undefined` when the value is sent as it is.
 */
export function bodyValueType(tables: ActionBodyTables, csdlType: string): string | undefined {
  const name = elementName(csdlType);
  return tables.enums.has(name) || tables.types.has(name) || tables.entities.has(name)
    ? name
    : undefined;
}

/**
 * Source of the generated `internal/actionBody.ts`.
 *
 * @param runtimePackage - The package the generated code imports its runtime helpers from.
 * @param metadataModule - Import specifier of the generated `metadata.ts`, from `internal/`.
 */
export function actionBodySource(
  tables: ActionBodyTables,
  runtimePackage: string,
  metadataModule: string
): string {
  return bodySource(tables, { runtimePackage, metadataModule });
}

/**
 * Source of the generated `internal/functionParameters.ts`: `parameterValue()`, which writes the
 * enum values in a function's complex or collection parameter as member names (#358).
 */
export function functionParametersSource(tables: ActionBodyTables): string {
  return bodySource(tables);
}

/** Name of the generated function-parameter module, under `internal/`. */
export const FUNCTION_PARAMETERS_MODULE = "functionParameters";

function bodySource(
  tables: ActionBodyTables,
  entities?: { runtimePackage: string; metadataModule: string }
): string {
  const enumLines = [...tables.enums]
    .map(([name, members]) => {
      const body = members.map(([m, v]) => `${JSON.stringify(m)}: ${String(v)}`).join(", ");
      return `  ${JSON.stringify(name)}: { ${body} },`;
    })
    .join("\n");
  const typeLines = [...tables.types]
    .map(([name, props]) => {
      const body = props.map(([p, t]) => `${JSON.stringify(p)}: ${JSON.stringify(t)}`).join(", ");
      return `  ${JSON.stringify(name)}: ${body ? `{ ${body} }` : "{}"},`;
    })
    .join("\n");
  const shared = `/**
 * The flags enums ${entities ? "a body" : "a parameter"} can hold, and their members. A flags enum's values are numbers,
 * combined with \`|\`; the other enums' values are their member names already.
 */
const ENUMS: Record<string, Record<string, number>> = {
${enumLines}
};

/**
 * The complex types that can hold a flags enum${entities ? " or an entity" : ""}: each property that is one, or a complex
 * type listed here. Inherited properties are included; a base type whose derived types hold one is
 * listed too, and the value's \`@odata.type\` picks the derived type.
 */
const TYPES: Record<string, Record<string, string>> = {
${typeLines}
};

/** \`record[key]\`, when it is the record's own property. */
function own<T>(record: Record<string, T>, key: string): T | undefined {
  return Object.prototype.hasOwnProperty.call(record, key) ? record[key] : undefined;
}

/** The type named by an \`@odata.type\` annotation, without the namespace, or \`fallback\`. */
function annotatedType(record: Record<string, unknown>, fallback: string): string {
  const odataType = record["@odata.type"];
  return typeof odataType === "string"
    ? odataType.replace(/^#?Microsoft\\.Dynamics\\.CRM\\./, "")
    : fallback;
}

/** The member name(s) of a flags value, or the number as a string when the members don't make it up. */
function enumName(value: number, members: Record<string, number>): string {
  const entries = Object.entries(members);
  const exact = entries.find(([, v]) => v === value);
  if (exact) return exact[0];
  if (Number.isInteger(value) && value > 0 && value <= 0x7fffffff) {
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
`;

  const walker = (name: string, doc: string, entityLine: string): string => `
/**
 * ${doc} The value isn't changed: objects and arrays that hold something to convert are copied. A
 * string (a member name) is left as it is.
 */
export function ${name}(value: unknown, type: string): unknown {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map((item: unknown) => ${name}(item, type));
  const members = own(ENUMS, type);
  if (members) return typeof value === "number" ? enumName(value, members) : value;
  if (typeof value !== "object") return value;
  const record = value as Record<string, unknown>;
${entityLine}  const properties = own(TYPES, annotatedType(record, type));
  if (!properties) return value;
  let copy: Record<string, unknown> | undefined;
  for (const [property, propertyType] of Object.entries(properties)) {
    if (!(property in record)) continue;
    const before = record[property];
    const after = ${name}(before, propertyType);
    if (after !== before) {
      if (!copy) copy = { ...record };
      copy[property] = after;
    }
  }
  return copy ?? value;
}
`;

  if (!entities) {
    return `/**
 * Complex and collection parameters of the generated functions.
 * Generated by dataverse-gen from the CSDL $metadata. Do not edit by hand.
 *
 * A complex or collection parameter is sent as JSON in a parameter alias (\`?@p1={...}\`), and
 * Dataverse reads an enum member there only by name: \`"ReadAccess"\`, or for a flags enum
 * \`"ReadAccess, WriteAccess"\`. A generated flags enum's values are numbers, so the generated
 * functions pass such a parameter through {@link parameterValue} before formatParameterAlias().
 */

${shared}${walker(
      "parameterValue",
      "A complex or collection function parameter with its flags enum values as member names. `type` is the parameter's enum or complex type.",
      ""
    )}`;
  }

  const entityNames = [...tables.entities].map((e) => JSON.stringify(e)).join(", ");
  return `/**
 * Request bodies of the generated actions.
 * Generated by dataverse-gen from the CSDL $metadata. Do not edit by hand.
 *
 * The Web API reads an enum member in a JSON body only as a string: \`"ReadAccess"\`, or for a flags
 * enum \`"ReadAccess, WriteAccess"\`; it rejects a number. An entity parameter is an entity: a
 * reference is \`@odata.type\` and the primary key, and a lookup of a record is
 * \`"<navigation property>@odata.bind": "/<entity set>(<id>)"\`. A generated flags enum's values are
 * numbers and generated entities take an EntityReference for a lookup, so the generated actions
 * pass each parameter that can hold a flags enum or an entity through {@link bodyValue}.
 */
import {
  formatEntityForWrite,
  getEntitySetNameFromReference,
  isEntityReference,
} from ${JSON.stringify(entities.runtimePackage)};
import { EntityMetadataCache } from ${JSON.stringify(entities.metadataModule)};

${shared}
/** The entity types a body can hold. */
const ENTITIES: ReadonlySet<string> = new Set<string>([${entityNames}]);

/**
 * An entity in a body. A reference is sent as it is (\`@odata.type\` and the primary key). A record
 * of a generated table goes through formatEntityForWrite(): \`@odata.type\`, and a lookup set with
 * an EntityReference becomes \`<navigation property>@odata.bind\`. A record of another table keeps
 * its properties, with references turned into binds the same way.
 */
function entityValue(record: Record<string, unknown>, type: string): unknown {
  if (isEntityReference(record)) return record;
  const metadata = own(EntityMetadataCache, annotatedType(record, type));
  if (metadata) {
    return formatEntityForWrite(record, metadata, { metadataCache: EntityMetadataCache });
  }
  const body: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if (key === "id" || key === "logicalName" || value === undefined) continue;
    if (isEntityReference(value)) {
      const entitySet =
        value.entitySetName ??
        own(EntityMetadataCache, value.logicalName)?.collectionName ??
        getEntitySetNameFromReference(value);
      body[\`\${key}@odata.bind\`] = \`/\${entitySet}(\${value.id.replace(/^\\{|\\}$/g, "")})\`;
    } else {
      body[key] = value;
    }
  }
  return body;
}
${walker(
  "bodyValue",
  "A body parameter as the Web API reads it: flags enum values as member names, and entities as entities (see {@link entityValue}). `type` is the parameter's enum, entity or complex type.",
  "  if (ENTITIES.has(type)) return entityValue(record, type);\n"
)}`;
}
