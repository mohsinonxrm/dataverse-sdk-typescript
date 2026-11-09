/**
 * The values the visitor types for an operation's parameters, read by the parameter's declared
 * TypeScript type: text for `string`, a number for `number`, `true`/`false` for `boolean`, and
 * JSON for the rest (a word that isn't JSON, such as an enum member's name, stays a string).
 *
 * A record reference can be written as `{ "logicalName": "account", "id": "<guid>" }` where the
 * parameter takes an `EntityReference`; it becomes `createEntityReference("account", "<guid>")`,
 * in the request and in the generated code.
 */
import type { CatalogOperation, CatalogParameter, OperationInput } from "./types";

/** A record reference the visitor wrote as `{ logicalName, id }`. */
export class ReferenceValue {
  constructor(
    readonly logicalName: string,
    readonly id: string
  ) {}
}

/** How a parameter is edited. */
export type InputKind = "text" | "number" | "boolean" | "json";

export function inputKind(type: string): InputKind {
  if (type === "string" || type === "string | Date") return "text";
  if (type === "number") return "number";
  if (type === "boolean") return "boolean";
  return "json";
}

/** An example of a value, shown as the field's placeholder. */
export function placeholderFor(type: string): string {
  if (type.startsWith("string[]")) return '["account", "contact"]';
  if (type === "number[]") return "[1, 2]";
  if (/\bEntityReference\b/.test(type)) {
    const ref = '{ "logicalName": "account", "id": "00000000-0000-0000-0000-000000000000" }';
    return /\)\[\]$|\[\]$/.test(type) ? `[${ref}]` : ref;
  }
  if (type === "string" || type === "string | Date") return "text";
  if (type === "number") return "0";
  return "JSON";
}

export class ValueError extends Error {
  constructor(
    readonly field: string,
    /** What's wrong, without the field's name. */
    readonly reason: string,
    /** Nothing was typed for a required field (as opposed to a wrong value). */
    readonly missing = false
  ) {
    super(`${field}: ${reason}`);
    this.name = "ValueError";
  }
}

function toReferences(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(toReferences);
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const keys = Object.keys(record).sort();
    if (
      keys.length === 2 &&
      keys[0] === "id" &&
      keys[1] === "logicalName" &&
      typeof record.id === "string" &&
      typeof record.logicalName === "string"
    ) {
      return new ReferenceValue(record.logicalName, record.id);
    }
    return Object.fromEntries(Object.entries(record).map(([k, v]) => [k, toReferences(v)]));
  }
  return value;
}

/**
 * The value of parameter `param` from the text typed for it; `undefined` when it's empty (the
 * parameter is left out).
 * @throws ValueError when the text can't be a value of the parameter's type.
 */
export function parseValue(param: Pick<CatalogParameter, "name" | "type">, text: string): unknown {
  const { name, type } = param;
  const trimmed = text.trim();
  if (trimmed === "") return undefined;
  switch (inputKind(type)) {
    case "text":
      return text;
    case "number": {
      const n = Number(trimmed);
      if (!Number.isFinite(n)) throw new ValueError(name, `"${trimmed}" isn't a number.`);
      return n;
    }
    case "boolean":
      if (trimmed === "true") return true;
      if (trimmed === "false") return false;
      throw new ValueError(name, "must be true or false.");
    case "json": {
      // A list of strings can be typed without the JSON brackets: account, contact
      if (type === "string[]" && !trimmed.startsWith("[")) {
        return trimmed
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
      let value: unknown;
      try {
        value = JSON.parse(trimmed);
      } catch {
        if (/^[[{"]/.test(trimmed)) throw new ValueError(name, "isn't valid JSON.");
        // A bare word, such as an enum member's name.
        return trimmed;
      }
      if (type.endsWith("[]") && !Array.isArray(value))
        throw new ValueError(name, "must be a JSON array.");
      return /\bEntityReference\b/.test(type) ? toReferences(value) : value;
    }
  }
}

/** An operation's constructor arguments and parameters object, from what the visitor typed. */
export interface OperationValues {
  /** The arguments before the parameters object, in order. */
  args: string[];
  /** The parameters object (only the parameters that were filled in), or `undefined` if the operation takes none. */
  parameters?: Record<string, unknown>;
}

/**
 * The values of `op` from `input`, as far as they go: a missing argument becomes `{name}`, and a
 * missing or invalid parameter is left out. `problems` says what must be fixed before it can run;
 * the code can be shown before that.
 */
export function draftValues(
  op: CatalogOperation,
  input: OperationInput
): OperationValues & { problems: ValueError[] } {
  const problems: ValueError[] = [];
  const args = op.args.map((a) => {
    const value = (input.args[a.name] ?? "").trim();
    if (value) return value;
    problems.push(new ValueError(a.name, "is required.", true));
    return `{${a.name}}`;
  });
  if (!op.parameters) return { args, problems };
  const parameters: Record<string, unknown> = {};
  for (const p of op.parameters) {
    try {
      const value = parseValue(p, input.parameters[p.name] ?? "");
      if (value !== undefined) parameters[p.name] = value;
      else if (!p.optional) problems.push(new ValueError(p.name, "is required.", true));
    } catch (error) {
      if (error instanceof ValueError) problems.push(error);
      else throw error;
    }
  }
  return { args, parameters, problems };
}

/**
 * The values of `op` from `input`.
 * @throws ValueError for a missing argument or required parameter, or a value of the wrong type.
 */
export function operationValues(op: CatalogOperation, input: OperationInput): OperationValues {
  const { problems, ...values } = draftValues(op, input);
  if (problems[0]) throw problems[0];
  return values;
}

/** Whether a value holds a record reference written as `{ logicalName, id }`. */
export function hasReference(value: unknown): boolean {
  if (value instanceof ReferenceValue) return true;
  if (Array.isArray(value)) return value.some(hasReference);
  if (value && typeof value === "object") return Object.values(value).some(hasReference);
  return false;
}

/**
 * `value` with each `ReferenceValue` replaced by the SDK's `EntityReference`, made by the
 * package's own `createEntityReference`.
 */
export function materialize(
  value: unknown,
  createEntityReference: (logicalName: string, id: string) => unknown
): unknown {
  if (value instanceof ReferenceValue) return createEntityReference(value.logicalName, value.id);
  if (Array.isArray(value)) return value.map((v) => materialize(v, createEntityReference));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, materialize(v, createEntityReference)])
    );
  }
  return value;
}
