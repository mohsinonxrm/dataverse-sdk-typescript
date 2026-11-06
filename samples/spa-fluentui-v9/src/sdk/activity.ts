/**
 * The live activity log: what the SDK's `logger`, `telemetry` and `retry.onRetry` hooks report,
 * for the Telemetry page. A small external store, read with `useSyncExternalStore`.
 */
import { useSyncExternalStore } from "react";

export type ActivityLevel = "debug" | "info" | "warn" | "error";
export type ActivitySource = "logger" | "telemetry" | "retry";

export interface ActivityEntry {
  id: number;
  time: Date;
  source: ActivitySource;
  level: ActivityLevel;
  message: string;
  /** Structured data the hook passed (log `meta`, telemetry properties). */
  detail?: unknown;
}

const LIMIT = 500;
let entries: readonly ActivityEntry[] = [];
let nextId = 1;
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

export const activity = {
  push(entry: Omit<ActivityEntry, "id" | "time">): void {
    entries = [...entries.slice(-(LIMIT - 1)), { ...entry, id: nextId++, time: new Date() }];
    emit();
  },
  /** Every entry, oldest first. */
  snapshot: (): readonly ActivityEntry[] => entries,
  clear(): void {
    entries = [];
    emit();
  },
};

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function snapshot(): readonly ActivityEntry[] {
  return entries;
}

export function useActivity(): readonly ActivityEntry[] {
  return useSyncExternalStore(subscribe, snapshot);
}
