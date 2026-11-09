/**
 * The environment each signed-in account chose last, in this browser's `localStorage` (a URL
 * isn't a secret). The picker puts it first; the app saves it whenever the environment changes.
 */
import { normalizeUrl, validateEnvironmentUrl } from "../config";
import { readLocal, writeLocal } from "../lib/storage";

const LAST_ENVIRONMENT_KEY = "explorer-last-environment";
/** Accounts remembered at most; the oldest is forgotten first. */
const MAX_ACCOUNTS = 20;

function readAll(): Array<[accountId: string, url: string]> {
  const saved = readLocal(LAST_ENVIRONMENT_KEY);
  if (!saved) return [];
  try {
    const value = JSON.parse(saved) as unknown;
    if (!value || typeof value !== "object" || Array.isArray(value)) return [];
    return Object.entries(value).filter(
      (entry): entry is [string, string] =>
        typeof entry[1] === "string" && validateEnvironmentUrl(entry[1]) === undefined
    );
  } catch {
    return [];
  }
}

/** The environment `accountId` chose last, if this browser remembers one. */
export function readLastEnvironment(accountId: string): string | undefined {
  const url = readAll().find(([id]) => id === accountId)?.[1];
  return url === undefined ? undefined : normalizeUrl(url);
}

/** Remember the environment `accountId` chose. URLs the site can't call are ignored. */
export function rememberEnvironment(accountId: string, url: string): void {
  if (validateEnvironmentUrl(url) !== undefined) return;
  const others = readAll().filter(([id]) => id !== accountId);
  const entries = [...others, [accountId, normalizeUrl(url)] as const].slice(-MAX_ACCOUNTS);
  // Object.fromEntries defines own properties, so no account id can reach the prototype.
  writeLocal(LAST_ENVIRONMENT_KEY, JSON.stringify(Object.fromEntries(entries)));
}
