/**
 * @fileoverview The optional peer dependencies of the `connectionString` setup path.
 *
 * `@azure/monitor-opentelemetry` and `@opentelemetry/resources` are needed only when the adapter
 * calls `useAzureMonitor()` itself (`connectionString`). An app that calls `useAzureMonitor()` on
 * its own, or exports spans some other way, doesn't have to install them.
 *
 * They are loaded on first use, synchronously (both ship CommonJS), and the result is remembered;
 * a package that is missing (or fails to load) is remembered as an error instead of failing the
 * import of the adapter. There is no top-level `await`, so a CommonJS app can `require()` this
 * package (#364), and an app that doesn't use `connectionString` never loads the distro.
 */

import { createRequire } from "node:module";
import type * as AzureMonitor from "@azure/monitor-opentelemetry";
import type * as Resources from "@opentelemetry/resources";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";

interface OptionalPeer<T> {
  name: string;
  module?: T;
  error?: unknown;
}

/** Loads a package by name. */
export type PeerLoader = (name: string) => unknown;

const defaultLoader: PeerLoader = createRequire(import.meta.url);
let loader: PeerLoader = defaultLoader;
const loaded = new Map<string, OptionalPeer<unknown>>();

/**
 * Replace how the optional peers are loaded (`undefined` restores the default). For tests:
 * `vi.mock` doesn't reach `require()`. Not exported from the package.
 */
export function setPeerLoader(next: PeerLoader | undefined): void {
  loader = next ?? defaultLoader;
  loaded.clear();
}

function load<T>(name: string): OptionalPeer<T> {
  let peer = loaded.get(name);
  if (!peer) {
    try {
      peer = { name, module: loader(name) };
    } catch (error) {
      peer = { name, error };
    }
    loaded.set(name, peer);
  }
  return peer as OptionalPeer<T>;
}

export function azureMonitor(): OptionalPeer<typeof AzureMonitor> {
  return load("@azure/monitor-opentelemetry");
}

export function otelResources(): OptionalPeer<typeof Resources> {
  return load("@opentelemetry/resources");
}

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
