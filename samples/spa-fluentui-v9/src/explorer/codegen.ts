/**
 * The SDK code for the request in the explorer: a `client.api()` chain for a raw request, and for
 * a typed operation one of three flavours: `client.execute(new XAction(…))`,
 * `OrganizationService.execute()`, or the `client.api()` chain of the request it sends. The run
 * button runs the same thing (rawRequest.ts, operations.ts), so the code is what ran.
 */
import type { ApiVersion } from "@mohsinonxrm/dataverse-sdk-core";
import type { ChainCall, RawPlan } from "./rawRequest";
import { PACKAGE_OF, type CatalogOperation, type CodeFlavour } from "./types";
import { hasReference, ReferenceValue, type OperationValues } from "./values";

const WIDTH = 80;
const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;

/** A string as a TypeScript string literal. */
const str = (text: string) => JSON.stringify(text);

/**
 * `value` as a TypeScript expression: objects with unquoted keys where they can be, a record
 * reference as `createEntityReference(…)`, on one line when it fits in the width.
 */
export function tsLiteral(value: unknown, indent = 0): string {
  if (value instanceof ReferenceValue) {
    return `createEntityReference(${str(value.logicalName)}, ${str(value.id)})`;
  }
  if (typeof value === "string") return str(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value === null) return "null";
  // Values JSON can't hold (functions, symbols) don't come from JSON input.
  if (typeof value !== "object") return "undefined";
  const pad = "  ".repeat(indent + 1);
  const end = "  ".repeat(indent);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    const items = value.map((v) => tsLiteral(v, indent + 1));
    const flat = `[${items.join(", ")}]`;
    if (flat.length + indent * 2 <= WIDTH && !flat.includes("\n")) return flat;
    return `[\n${items.map((i) => `${pad}${i},`).join("\n")}\n${end}]`;
  }
  const entries = Object.entries(value as Record<string, unknown>);
  if (!entries.length) return "{}";
  const props = entries.map(
    ([k, v]) => `${IDENTIFIER.test(k) ? k : str(k)}: ${tsLiteral(v, indent + 1)}`
  );
  const flat = `{ ${props.join(", ")} }`;
  if (flat.length + indent * 2 <= WIDTH && !flat.includes("\n")) return flat;
  return `{\n${props.map((p) => `${pad}${p},`).join("\n")}\n${end}}`;
}

function callText(call: ChainCall): string {
  return `.${call.name}(${call.args.map((a) => tsLiteral(a)).join(", ")})`;
}

export const CLIENT_NOTE =
  "// `client` is a DataverseClient for your environment (see Getting started).";

/**
 * The comment on what `client` is: with a Web API version other than the SDK's default (v9.2),
 * how to create the client with it.
 */
export function clientNote(apiVersion: ApiVersion = "v9.2"): string {
  if (apiVersion === "v9.2") return CLIENT_NOTE;
  return [
    `// \`client\` is a DataverseClient for your environment on Web API ${apiVersion}:`,
    `// new DataverseClient({ baseUrl, tokenProvider, apiVersion: ${str(apiVersion)} })`,
  ].join("\n");
}

/** The `client.api()` chain of a raw request. */
export function rawCode(plan: RawPlan, apiVersion?: ApiVersion): string {
  const body = plan.terminal === "post" || plan.terminal === "patch" || plan.terminal === "put";
  const terminal = `.${plan.terminal}(${body && plan.body !== undefined ? tsLiteral(plan.body, 1) : ""})`;
  const lead = plan.terminal === "delete" ? "await client" : "const result = await client";
  const steps = [`.api(${str(plan.path)})`, ...plan.calls.map(callText), terminal];
  const flat = `${lead}${steps.join("")};`;
  const code =
    flat.length <= WIDTH && !flat.includes("\n")
      ? flat
      : `${lead}\n${steps.map((s) => `  ${s}`).join("\n")};`;
  return `${clientNote(apiVersion)}\n${code}`;
}

/** `new XAction(…)` for the operation and its values. */
export function constructorCall(op: CatalogOperation, values: OperationValues): string {
  const args: string[] = values.args.map((a) => str(a));
  const params = values.parameters;
  const allOptional = op.parameters?.every((p) => p.optional) ?? true;
  if (params && (Object.keys(params).length > 0 || !allOptional)) args.push(tsLiteral(params, 1));
  const flat = `new ${op.className}(${args.join(", ")})`;
  // On its own line, indented, it still fits.
  if (flat.length <= WIDTH - 2 && !flat.includes("\n")) return flat;
  if (args.length === 1) return flat;
  return `new ${op.className}(\n  ${args.join(",\n  ")}\n)`;
}

/** The SDK code for a typed operation, in `flavour`. `plan` is needed for the "fluent" flavour. */
export function operationCode(
  op: CatalogOperation,
  values: OperationValues,
  flavour: CodeFlavour,
  plan?: RawPlan,
  apiVersion?: ApiVersion
): string {
  if (flavour === "fluent") {
    if (!plan) throw new Error("The client.api() flavour needs the operation's request.");
    return rawCode(plan, apiVersion);
  }
  const names = [op.className];
  if (hasReference(values.parameters)) names.push("createEntityReference");
  const imports = [`import { ${names.join(", ")} } from "${PACKAGE_OF[op.kind]}";`];
  const created = constructorCall(op, values);
  // `const result = await x.execute(new …);`, with the argument on its own lines when it doesn't fit.
  const call = (callee: string) => {
    const flat = `const result = await ${callee}(${created});`;
    if (flat.length <= WIDTH && !created.includes("\n")) return flat;
    return `const result = await ${callee}(\n  ${created.replace(/\n/g, "\n  ")}\n);`;
  };
  if (flavour === "service") {
    imports.unshift('import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";');
    return [
      ...imports,
      "",
      clientNote(apiVersion),
      "const service = new OrganizationService(client);",
      call("service.execute"),
    ].join("\n");
  }
  return [...imports, "", clientNote(apiVersion), call("client.execute")].join("\n");
}
