/**
 * Typed operations: build the operation object from the package's class and the visitor's
 * values, and run it the way the chosen code flavour says.
 */
import type {
  DataverseClient,
  Executable,
  RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import {
  parseRawRequest,
  rawInputFromRequestInformation,
  runRawPlan,
  type RawPlan,
} from "./rawRequest";
import type { CatalogOperation, CodeFlavour } from "./types";
import { materialize, type OperationValues } from "./values";

/** A loaded operation package: its exports by name. */
export type OperationPackage = Readonly<Record<string, unknown>>;

type OperationClass = new (...args: unknown[]) => Executable<unknown>;

function isOperationClass(value: unknown): value is OperationClass {
  return typeof value === "function" && "prototype" in value;
}

/**
 * The operation object: `new <className>(...args, parameters)` from the package, with record
 * references made by the package's `createEntityReference`.
 */
export function instantiate(
  pkg: OperationPackage,
  op: CatalogOperation,
  values: OperationValues
): Executable<unknown> {
  const Ctor = pkg[op.className];
  if (!isOperationClass(Ctor)) throw new Error(`The package has no class ${op.className}.`);
  const create = pkg.createEntityReference;
  const reference =
    typeof create === "function"
      ? (logicalName: string, id: string) =>
          (create as (l: string, i: string) => unknown)(logicalName, id)
      : () => {
          throw new Error("The package has no createEntityReference.");
        };
  const args: unknown[] = [...values.args];
  if (values.parameters) args.push(materialize(values.parameters, reference));
  return new Ctor(...args);
}

/** The `client.api()` chain that sends the same request as `operation` (the "fluent" flavour). */
export function fluentPlan(operation: Executable<unknown>, apiRoot: string): RawPlan {
  const info: RequestInformation = operation.toRequestInformation(apiRoot);
  return parseRawRequest(rawInputFromRequestInformation(info, apiRoot));
}

/** Run `operation` as the flavour's code does. */
export function runOperation(
  client: DataverseClient,
  operation: Executable<unknown>,
  flavour: CodeFlavour,
  signal?: AbortSignal
): Promise<unknown> {
  switch (flavour) {
    case "typed":
      return client.execute(operation, { signal });
    case "service":
      return new OrganizationService(client).execute(operation, { signal });
    case "fluent":
      return runRawPlan(client, fluentPlan(operation, client.getBaseUrl()), signal);
  }
}
