/**
 * The value an operation resolves to, and its type, for each kind of return type (#300).
 *
 * One contract for the generated actions, functions and messages, and for `dataverse-gen`
 * (packages/dataverse-sdk-generator): `client.execute()` resolves the value the operation
 * returns, not the OData envelope around it.
 *
 * | CSDL return type                     | Web API response                               | Value                               |
 * | ------------------------------------ | ---------------------------------------------- | ----------------------------------- |
 * | none                                 | `204 No Content`                               | `void`                              |
 * | primitive or enum (`Edm.String`, …)  | `{ "@odata.context", "value": x }`             | `x`                                 |
 * | collection (`Collection(…)`)         | `{ "@odata.context", "value": [ … ] }`         | the array (`[]` for a 204)          |
 * | complex type                         | the complex value, with `@odata.context`       | the body                            |
 * | entity (or `crmbaseentity`)          | the record, with `@odata.context`, `@odata.etag` | the body (`null` for a 204)       |
 *
 * Primitive and collection values are unwrapped from `value`. A complex or entity value is the
 * body itself, with its annotations, as `retrieve()` returns a record: `@odata.etag` is the
 * record's version and `@odata.type` says which table a `crmbaseentity` record is.
 *
 * Dataverse answers `204 No Content` for an entity or entity-collection output that wasn't set,
 * although the CSDL says `Nullable="false"`; that is `null` and `[]`. A complex output that
 * wasn't set is still a 200, with the properties `null`.
 */
import type { CsdlSchema } from "../parsers/csdl-types.js";
import { SYSTEM_ENTITIES } from "./polymorphism.js";
import {
  csdlTypeToTsWithExpansion,
  extractEntityTypeName,
  isCollectionType,
} from "./typescript-writer.js";

export type ReturnKind = "none" | "primitive" | "collection" | "complex" | "entity";

/** Annotations at the top of an entity response. */
const ENTITY_ANNOTATIONS = `"@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string`;
/** Annotations on each record of an entity collection. */
const RECORD_ANNOTATIONS = `"@odata.etag"?: string; "@odata.type"?: string`;

/** TypeScript types of the OData primitives, as the Web API writes them in JSON. */
const EDM_TYPES: Record<string, string> = {
  Binary: "string", // base64
  Boolean: "boolean",
  Byte: "number",
  Date: "string", // 2024-05-01
  DateTimeOffset: "string", // ISO 8601
  Decimal: "number",
  Double: "number",
  Duration: "string",
  Guid: "string",
  Int16: "number",
  Int32: "number",
  Int64: "number",
  SByte: "number",
  Single: "number",
  String: "string",
  TimeOfDay: "string",
};

/** How an operation's response is typed and read. */
export interface OperationReturn {
  kind: ReturnKind;
  /** Type names the declaration uses, imported from `./types/index.js` (`X` or `X as XData`). */
  imports: string[];
  /** The declaration uses `EntityReference`. */
  needsEntityReference: boolean;
  /** `export type|interface <name> …`: the value `execute()` resolves. */
  declaration: string;
}

/** What a return type is: its kind and, for a collection, the kind of its elements. */
function classify(
  csdl: CsdlSchema,
  type: string
): { element: "primitive" | "enum" | "entity" | "record" | "complex" | "unknown"; name: string } {
  const name = extractEntityTypeName(type);
  const inner = isCollectionType(type) ? type.slice("Collection(".length, -1) : type;
  if (inner.startsWith("Edm.")) return { element: "primitive", name: inner.slice(4) };
  const qualified = inner.replace(/^mscrm\./, "Microsoft.Dynamics.CRM.");
  if (csdl.enumTypes.some((e) => `${e.namespace}.${e.name}` === qualified)) {
    return { element: "enum", name };
  }
  if (SYSTEM_ENTITIES.includes(name.toLowerCase())) return { element: "record", name };
  if (csdl.entityTypes.some((e) => `${e.namespace}.${e.name}` === qualified)) {
    return { element: "entity", name };
  }
  if (csdl.complexTypes.some((c) => `${c.namespace}.${c.name}` === qualified)) {
    return { element: "complex", name };
  }
  return { element: "unknown", name };
}

/** `T[]`, or `Array<T>` when T isn't a plain name. */
function arrayOf(element: string): string {
  return /^[\w$]+$/.test(element) ? `${element}[]` : `Array<${element}>`;
}

/**
 * How an operation's response is typed and read.
 *
 * @param returnType - The CSDL return type, if any.
 * @param name - Name of the declaration (`WhoAmIResponse`; `WhoAmIResult` in a message).
 * @param label - What the operation is, for the doc comment (`WhoAmI function`).
 * @param reserved - Names already used in the file: a type named like one is imported as `…Data`.
 */
export function operationReturn(
  csdl: CsdlSchema,
  returnType: string | undefined,
  name: string,
  label: string,
  reserved: readonly string[] = []
): OperationReturn {
  const imports: string[] = [];
  let needsEntityReference = false;
  const taken = new Set([name, ...reserved]);
  /** A type from `./types/index.js`, under an alias when its name is taken. */
  const use = (typeName: string): string => {
    if (!taken.has(typeName)) {
      imports.push(typeName);
      return typeName;
    }
    const alias = `${typeName}Data`;
    imports.push(`${typeName} as ${alias}`);
    return alias;
  };

  let doc = `/**\n * Response from the ${label}.\n *\n`;
  if (!returnType) {
    doc += ` * Nothing: the Web API answers 204 No Content.\n */\n`;
    return {
      kind: "none",
      imports,
      needsEntityReference,
      declaration: `${doc}export type ${name} = void;\n`,
    };
  }

  const { element, name: elementName } = classify(csdl, returnType);
  const elementType = (): string => {
    switch (element) {
      case "primitive":
        return EDM_TYPES[elementName] ?? "unknown";
      case "enum":
        // The Web API writes an enum value as its member name(s): "Entity", "Entity, Attributes"
        return "string";
      case "entity":
        return `${use(elementName)} & { ${RECORD_ANNOTATIONS} }`;
      case "record":
        return `{ ${RECORD_ANNOTATIONS}; [column: string]: unknown }`;
      case "complex":
        return use(elementName);
      default:
        return "unknown";
    }
  };

  if (isCollectionType(returnType)) {
    doc += ` * The collection, read from the \`value\` of the response body.\n`;
    if (element === "entity" || element === "record") {
      doc += ` * Each record keeps its annotations. A 204 (an output that wasn't set) is \`[]\`.\n`;
    }
    doc += ` */\n`;
    return {
      kind: "collection",
      imports,
      needsEntityReference,
      declaration: `${doc}export type ${name} = ${arrayOf(elementType())};\n`,
    };
  }

  if (element === "primitive" || element === "enum" || element === "unknown") {
    doc += ` * The value, read from the \`value\` of the response body.\n`;
    if (element === "enum")
      doc += ` * An enum value is its member name (names separated by ", " for flags).\n`;
    doc += ` */\n`;
    return {
      kind: "primitive",
      imports,
      needsEntityReference,
      declaration: `${doc}export type ${name} = ${elementType()};\n`,
    };
  }

  if (element === "entity" || element === "record") {
    doc += ` * The record: the response body itself, with its annotations (not wrapped in \`value\`).\n`;
    doc += ` * \`null\` when the Web API answers 204 No Content (an entity output that wasn't set).\n */\n`;
    const record =
      element === "entity"
        ? `(${use(elementName)} & { ${ENTITY_ANNOTATIONS} })`
        : `{ ${ENTITY_ANNOTATIONS}; [column: string]: unknown }`;
    return {
      kind: "entity",
      imports,
      needsEntityReference,
      declaration: `${doc}export type ${name} = ${record} | null;\n`,
    };
  }

  // A complex type: the body itself, its properties expanded with their CSDL nullability
  doc += ` * The response body itself, with its \`@odata.context\` (not wrapped in \`value\`).\n */\n`;
  const qualified = returnType.replace(/^mscrm\./, "Microsoft.Dynamics.CRM.");
  const complexType = csdl.complexTypes.find((c) => `${c.namespace}.${c.name}` === qualified);
  let declaration = `${doc}export interface ${name} {\n`;
  declaration += `  "@odata.context"?: string;\n`;
  for (const prop of complexType?.properties ?? []) {
    let tsType = csdlTypeToTsWithExpansion(prop.type, csdl);
    const base = tsType.replace(/\[\]/g, "");
    if (base === "EntityReference") {
      needsEntityReference = true;
    } else if (!["string", "number", "boolean", "any", "unknown"].includes(base)) {
      const local = use(base);
      if (local !== base) tsType = tsType.replace(base, local);
    }
    const optional = prop.nullable ? "?" : "";
    declaration += `  ${prop.name}${optional}: ${tsType};\n`;
  }
  declaration += `}\n`;
  return { kind: "complex", imports: [...new Set(imports)], needsEntityReference, declaration };
}

/**
 * The `parseResponse` method of a generated action or function: the value `execute()` resolves.
 *
 * @param typeName - The declaration from {@link operationReturn}.
 */
export function parseResponseMethod(ret: OperationReturn, typeName: string): string {
  if (ret.kind === "none") {
    let code = `  parseResponse(_response: Response): Promise<${typeName}> {\n`;
    code += `    // No return value: the Web API answers 204 No Content\n`;
    code += `    return Promise.resolve();\n`;
    code += `  }\n`;
    return code;
  }
  let code = `  async parseResponse(response: Response): Promise<${typeName}> {\n`;
  code += parseResponseLines(ret.kind, "    ", (data) => `${data} as ${typeName}`, {
    wrapped: (data) => `(${data} as { value: ${typeName} }).value`,
  });
  code += `  }\n`;
  return code;
}

/**
 * The statements that read a response for `kind`, indented by `indent`.
 *
 * @param body - Expression for the value of a body that is the value itself.
 * @param read.wrapped - Expression for the value of a body wrapped in `value`.
 */
function parseResponseLines(
  kind: Exclude<ReturnKind, "none">,
  indent: string,
  body: (data: string) => string,
  read: { wrapped: (data: string) => string }
): string {
  const json = "(await response.json())";
  switch (kind) {
    case "primitive":
      return (
        `${indent}// A primitive comes wrapped: { "@odata.context": "…", "value": … }\n` +
        `${indent}return ${read.wrapped(json)};\n`
      );
    case "collection":
      return (
        `${indent}// An output that wasn't set answers 204 No Content: an empty collection\n` +
        `${indent}if (response.status === 204) return [];\n` +
        `${indent}// A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }\n` +
        `${indent}return ${read.wrapped(json)};\n`
      );
    case "complex":
      return (
        `${indent}// The body is the complex value, with its @odata.context\n` +
        `${indent}return ${body(json)};\n`
      );
    case "entity":
      return (
        `${indent}// An entity output that wasn't set answers 204 No Content\n` +
        `${indent}if (response.status === 204) return null;\n` +
        `${indent}// The body is the record, with its annotations\n` +
        `${indent}return ${body(json)};\n`
      );
  }
}

/**
 * The response class of a generated message: `result` is the value the action (or function, #344)
 * of the same name resolves (#300), and `fromResponse(data)` reads it from a parsed response body
 * (`undefined` for a 204), for example the body of a batch step.
 *
 * @param resultName - The declaration from {@link operationReturn} (`<Stem>Result`).
 * @param operation - What backs the message: a Web API action or function.
 */
export function messageResponseClass(
  ret: OperationReturn,
  responseClassName: string,
  resultName: string,
  messageName: string,
  operation: "action" | "function" = "action"
): { responseClass: string; parseResponse: string } {
  let parseResponse = `  async parseResponse(response: Response): Promise<${responseClassName}> {\n`;
  let responseClass = `/**\n * ${messageName} response message\n`;
  if (ret.kind === "none") {
    parseResponse = `  parseResponse(_response: Response): Promise<${responseClassName}> {\n`;
    parseResponse += `    // No return value (204 No Content)\n`;
    parseResponse += `    return Promise.resolve(new ${responseClassName}());\n`;
    parseResponse += `  }\n`;
    responseClass += ` */\n`;
    responseClass += `export class ${responseClassName} extends OrganizationResponse {\n`;
    responseClass += `  constructor() {\n    super('${messageName}');\n  }\n\n`;
    responseClass += `  static fromResponse(_data?: unknown): ${responseClassName} {\n`;
    responseClass += `    return new ${responseClassName}();\n  }\n}\n`;
    return { responseClass, parseResponse };
  }

  parseResponse += parseResponseLines(
    ret.kind,
    "    ",
    (data) => `${responseClassName}.fromResponse(${data})`,
    { wrapped: (data) => `${responseClassName}.fromResponse(${data})` }
  )
    .replace("return [];", `return ${responseClassName}.fromResponse(undefined);`)
    .replace("return null;", `return ${responseClassName}.fromResponse(undefined);`);
  parseResponse += `  }\n`;

  let read: string;
  switch (ret.kind) {
    case "primitive":
      read = `(data as { value: ${resultName} }).value`;
      break;
    case "collection":
      read = `data === undefined ? [] : (data as { value: ${resultName} }).value`;
      break;
    case "complex":
      read = `data as ${resultName}`;
      break;
    case "entity":
      read = `(data ?? null) as ${resultName}`;
      break;
  }
  responseClass += ` *\n * \`result\` is the value the ${messageName} ${operation} returns (see {@link ${resultName}}).\n`;
  responseClass += ` */\n`;
  responseClass += `export class ${responseClassName} extends OrganizationResponse {\n`;
  responseClass += `  constructor(public result: ${resultName}) {\n    super('${messageName}');\n  }\n\n`;
  responseClass += `  /** Read the result from a parsed response body (\`undefined\` for 204 No Content). */\n`;
  responseClass += `  static fromResponse(data: unknown): ${responseClassName} {\n`;
  responseClass += `    return new ${responseClassName}(${read});\n  }\n}\n`;
  return { responseClass, parseResponse };
}
