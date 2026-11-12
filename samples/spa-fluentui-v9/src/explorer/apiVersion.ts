/**
 * The Web API version the explorer's client uses (`DataverseClientOptions.apiVersion`), picked per
 * environment and kept in this browser's `localStorage` (a version isn't a secret).
 */
import type { ApiVersion } from "@mohsinonxrm/dataverse-sdk-core";
import { normalizeUrl } from "../config";
import { readLocal, writeLocal } from "../lib/storage";

/** The versions offered, newest first. Dataverse serves all three; v9.2 is the SDK's default. */
export const API_VERSIONS = ["v9.2", "v9.1", "v9.0"] as const satisfies readonly ApiVersion[];

export type ExplorerApiVersion = (typeof API_VERSIONS)[number];

export const DEFAULT_API_VERSION: ExplorerApiVersion = "v9.2";

const KEY = "explorer-api-version";
/** Environments remembered at most; the oldest is forgotten first. */
const MAX_ENVIRONMENTS = 20;

export const isApiVersion = (value: unknown): value is ExplorerApiVersion =>
  typeof value === "string" && (API_VERSIONS as readonly string[]).includes(value);

const keyOf = (environmentUrl: string) => normalizeUrl(environmentUrl).toLowerCase();

function readAll(): Array<[string, ExplorerApiVersion]> {
  const saved = readLocal(KEY);
  if (!saved) return [];
  try {
    const value = JSON.parse(saved) as unknown;
    if (!value || typeof value !== "object" || Array.isArray(value)) return [];
    return Object.entries(value).filter((e): e is [string, ExplorerApiVersion] =>
      isApiVersion(e[1])
    );
  } catch {
    return [];
  }
}

/** The version picked for `environmentUrl`, or the default. */
export function readApiVersion(environmentUrl: string): ExplorerApiVersion {
  const key = keyOf(environmentUrl);
  return readAll().find(([url]) => url === key)?.[1] ?? DEFAULT_API_VERSION;
}

/** Keep `version` for `environmentUrl`; the default isn't stored. */
export function writeApiVersion(environmentUrl: string, version: ExplorerApiVersion): void {
  const key = keyOf(environmentUrl);
  const others = readAll().filter(([url]) => url !== key);
  const entries = version === DEFAULT_API_VERSION ? others : [...others, [key, version] as const];
  // Object.fromEntries defines own properties, so no key can reach the prototype.
  writeLocal(
    KEY,
    entries.length ? JSON.stringify(Object.fromEntries(entries.slice(-MAX_ENVIRONMENTS))) : null
  );
}

/** `https://contoso.crm.dynamics.com/api/data/v9.1` */
export const apiRootOf = (environmentUrl: string, version: ApiVersion = DEFAULT_API_VERSION) =>
  `${normalizeUrl(environmentUrl)}/api/data/${version}`;
