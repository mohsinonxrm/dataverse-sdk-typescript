/**
 * @fileoverview The optional peer dependencies of the `connectionString` setup path.
 *
 * `@azure/monitor-opentelemetry` and `@opentelemetry/resources` are needed only when the adapter
 * calls `useAzureMonitor()` itself (`connectionString`). An app that calls `useAzureMonitor()` on
 * its own, or exports spans some other way, doesn't have to install them. They are imported once,
 * when this module loads, and a package that is missing (or fails to load) is remembered instead
 * of failing the import of the adapter.
 */

import type * as AzureMonitor from "@azure/monitor-opentelemetry";
import type * as Resources from "@opentelemetry/resources";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";

interface OptionalPeer<T> {
  name: string;
  module?: T;
  error?: unknown;
}

async function load<T>(name: string, importer: () => Promise<T>): Promise<OptionalPeer<T>> {
  try {
    return { name, module: await importer() };
  } catch (error) {
    return { name, error };
  }
}

export const azureMonitor = await load<typeof AzureMonitor>(
  "@azure/monitor-opentelemetry",
  () => import("@azure/monitor-opentelemetry")
);

export const otelResources = await load<typeof Resources>(
  "@opentelemetry/resources",
  () => import("@opentelemetry/resources")
);

/**
 * The loaded module, or a `DataverseInvalidRequestError` naming the package to install (with the
 * import error as `cause`).
 */
export function requirePeer<T>(peer: OptionalPeer<T>, neededFor: string): T {
  if (peer.module) {
    return peer.module;
  }
  throw new DataverseInvalidRequestError(
    `${neededFor} needs the optional peer dependency ${peer.name}. Install it in your app ` +
      `(npm install ${peer.name}), or call useAzureMonitor() yourself and omit connectionString.`,
    peer.error instanceof Error ? peer.error : undefined
  );
}
